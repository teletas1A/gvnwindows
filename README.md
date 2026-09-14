# Güvenli Şube — Windows Masaüstü Uygulaması

`https://xn--guvenlsube-2ub.com.tr/` sitesini Windows'ta, tarayıcı çubuğu olmadan
kendi penceresinde açan bir masaüstü uygulaması (Electron). Çıktı: kurulabilir bir
**Setup.exe**. Arka uç (SQL) değişmez.

## EXE'yi almanın yolu (bilgisayara bir şey kurmadan — GitHub Actions)
1. GitHub'da yeni bir depo oluşturun.
2. Bu klasördeki tüm dosyaları (`build`, `.github` klasörleri dahil) o depoya yükleyin.
3. **Actions** sekmesinde "Windows EXE Derle" işi çalışır (5-10 dk sürer).
4. Yeşil tik çıkınca çalışmaya girin → **Artifacts → guvenli-sube-setup** dosyasını indirin.
5. Zip'ten çıkan **`Guvenli Sube Setup 1.0.0.exe`** kurulum dosyasıdır. Çift tıklayıp kurun.

## Bilgisayarda derlemek (opsiyonel)
[Node.js](https://nodejs.org) kurulu bir Windows'ta:
```
npm install
npm run dist
```
Kurulum dosyası `dist/` klasöründe oluşur.

## Adresi değiştirmek
`main.js` içinde `START_URL` (ve gerekirse `INTERNAL_HOSTS`) satırı.

## Not
- İlk kurulumda Windows SmartScreen "bilinmeyen yayıncı" uyarısı verebilir
  ("Daha fazla bilgi → Yine de çalıştır"). Sebebi imzalama sertifikası olmamasıdır;
  uygulamanın çalışmasını engellemez.
- WebView2 (Edge motoru) Windows 10/11'de hazır gelir; ayrıca kuruluma gerek yoktur.
