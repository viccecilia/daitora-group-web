import json
import re
import time
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString
from deep_translator import GoogleTranslator

ROOT = Path.cwd()
PAGES = [
    "index.html",
    "about.html",
    "business.html",
    "business-hire.html",
    "business-taxi.html",
    "business-auto.html",
    "quality.html",
    "works.html",
    "company.html",
    "news.html",
    "contact.html",
    "privacy.html",
    "404.html",
]
TARGETS = {
    "zh-CN": "zh-CN",
    "en": "en",
    "ko": "ko",
    "zh-TW": "zh-TW",
}
OUT = ROOT / "scripts" / "i18n-content.json"

CJK_RE = re.compile(r"[\u3040-\u30ff\u3400-\u9fff]")
SKIP_EXACT = {
    "",
    "Daitora",
    "Daitora Group",
    "GROUP",
    "KIX / ITM / UKB",
    "DiDi / Uber",
    "Mercedes-Benz S-Class",
}


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def should_translate(text: str) -> bool:
    text = normalize(text)
    if text in SKIP_EXACT:
        return False
    if not CJK_RE.search(text):
        return False
    if len(text) <= 1:
        return False
    return True


def extract_texts() -> list[str]:
    found: list[str] = []
    seen: set[str] = set()
    for page in PAGES:
        path = ROOT / page
        if not path.exists():
            continue
        soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
        for tag in soup(["script", "style", "svg"]):
            tag.decompose()
        for node in soup.find_all(string=True):
            if not isinstance(node, NavigableString):
                continue
            text = normalize(str(node))
            if should_translate(text) and text not in seen:
                seen.add(text)
                found.append(text)
        for tag in soup.find_all(True):
            for attr in ("placeholder", "aria-label", "title", "alt", "value", "content"):
                value = tag.get(attr)
                if isinstance(value, str):
                    text = normalize(value)
                    if should_translate(text) and text not in seen:
                        seen.add(text)
                        found.append(text)
    return found


def load_cache() -> dict:
    if OUT.exists():
        return json.loads(OUT.read_text(encoding="utf-8"))
    return {}


def save_cache(cache: dict) -> None:
    OUT.write_text(json.dumps(cache, ensure_ascii=False, indent=2, sort_keys=True), encoding="utf-8")


def translate_missing(cache: dict, texts: list[str], lang: str, target: str) -> None:
    translator = GoogleTranslator(source="ja", target=target)
    missing = [text for text in texts if not cache.get(text, {}).get(lang)]
    print(f"{lang}: {len(missing)} missing")
    if not missing:
        return
    batch_size = 20
    for start in range(0, len(missing), batch_size):
        chunk = missing[start : start + batch_size]
        try:
            if hasattr(translator, "translate_batch"):
                translated = translator.translate_batch(chunk)
            else:
                translated = [translator.translate(item) for item in chunk]
        except Exception as exc:
            print(f"{lang}: batch failed at {start}: {exc}")
            translated = []
            for item in chunk:
                try:
                    translated.append(translator.translate(item))
                except Exception as item_exc:
                    print(f"{lang}: failed: {item[:60]} :: {item_exc}")
                    translated.append("")
                time.sleep(0.25)
        for source, value in zip(chunk, translated):
            if value:
                cache.setdefault(source, {})[lang] = value
        save_cache(cache)
        print(f"{lang}: {min(start + batch_size, len(missing))}/{len(missing)}")
        time.sleep(0.35)


def main() -> None:
    texts = extract_texts()
    print(f"source text nodes: {len(texts)}")
    cache = load_cache()
    for text in texts:
        cache.setdefault(text, {})
    save_cache(cache)
    for lang, target in TARGETS.items():
        translate_missing(cache, texts, lang, target)
    save_cache(cache)
    print(f"written: {OUT}")


if __name__ == "__main__":
    main()
