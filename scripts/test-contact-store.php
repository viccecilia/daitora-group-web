<?php
declare(strict_types=1);
define('DAITORA_CONTACT_TEST', true);
$dir=sys_get_temp_dir().DIRECTORY_SEPARATOR.'daitora-contact-store-test-'.bin2hex(random_bytes(4));
putenv('DAITORA_CONTACT_DATA_DIR='.$dir);
require dirname(__DIR__).'/api/send-contact.php';
$id=daitora_contact_archive(['type'=>'hire','name'=>'Test','email'=>'test@example.com','privacy'=>'on','website'=>''],1784500000,'production');
if($id===''||count(daitora_contact_records())!==1)exit(1);
$record=daitora_contact_records()[0];
if(isset($record['data']['privacy'])||isset($record['data']['website']))exit(1);
daitora_contact_set_delivery_status($id,'sent');
if(daitora_contact_records()[0]['delivery_status']!=='sent')exit(1);
foreach(glob($dir.DIRECTORY_SEPARATOR.'*')?:[] as $file)@unlink($file);@rmdir($dir);
echo "Contact store tests passed\n";
