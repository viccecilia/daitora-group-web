<?php
declare(strict_types=1);

return [
    'DAITORA_CONTACT_SHARED_SECRET' => 'replace-with-a-long-random-secret',
    'DAITORA_CONTACT_TO' => 'info@daitora-jp.com',
    // Hidden backup recipient added to the inquiry email as BCC.
    'DAITORA_CONTACT_BACKUP_TO' => 's_pang@daitora-jp.com',
    // Store this outside the public web root when the server permits it.
    'DAITORA_CONTACT_DATA_DIR' => '',
    'DAITORA_CONTACT_REPORT_TO' => 's_pang@daitora-jp.com',
    // Required only when the monthly report is invoked over HTTPS instead of PHP CLI.
    'DAITORA_CONTACT_REPORT_TOKEN' => 'replace-with-a-long-random-report-token',
];
