# Membuat plugin "Hello World"
Kita mulai dengan hal yang mudah terlebih dahulu. Berikut langkahnya
1. Buatlah sebuah file bernama `hello_world.plugin.php` pada folder `plugins/` yang ada di folder utama SLiMS anda.
2. Isi file tersebut dengan persyaratan minimal yang ada pada <a href="Intro#format-isi-plugin" target="_blank">Laman ini</a>

Jika sudah maka kita akan coba untuk menggunakan operasi <a href="Intro#hook" target="_blank">Hook</a> pada halaman OPAC, seperti berikut:
```php
$plugins->register(Plugins::CONTENT_BEFORE_LOAD, function(){
    exit('<h1>Hello World</h1>')
});
```

Setelah itu aktifkan plugin itu pada modul `System > Plugin`. Lalu buka halaman OPAC anda, dan lihat apa yang terjadi 😁. Bagaimana? sudah melihat hasilnya? nah dengan ini anda sudah membuat sebuah plugin sederhana.