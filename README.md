# FineArt Print Configurator

FineArt ve Giclee baskı siparişi için uçtan uca çalışan, görsel ön izleme destekli, çok adımlı bir ürün konfigüratörü.

## 🎯 Özellikler

- **Çok Adımlı Konfigürasyon**: Ebat → Kağıt → Kenarlık → Fotoblok → Paspartu → Çerçeve → Cam → Sepet
- **Canlı Önizleme**: Her seçimde gerçek zamanlı görsel güncelleme
- **Akıllı Validasyon**: Uyumsuz kombinasyonları otomatik engelleme
- **Dinamik Fiyatlandırma**: Anlık fiyat hesaplama

## 🚀 Başlangıç

```bash
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js sayfa ve route'lar
├── components/
│   ├── configurator/       # Adım bileşenleri
│   ├── preview/            # Önizleme canvas
│   ├── ui/                 # Tekrar kullanılabilir UI
│   └── layout/             # Sayfa düzeni
├── store/                  # Zustand state yönetimi
├── lib/
│   ├── validations/        # Zod şemaları
│   ├── rules/              # İş kuralları
│   └── pricing/            # Fiyat hesaplama
├── types/                  # TypeScript arayüzleri
└── data/                   # Statik veriler
```

## 🎨 Tasarım Dosyaları

Figma ve tasarım dosyalarını `/docs/design/` klasörüne yükleyin:

```
docs/
└── design/
    ├── figma/              # Figma export'ları (.fig, .sketch)
    ├── mockups/            # PNG/JPG mockup görselleri
    ├── icons/              # SVG ikonlar
    └── specs/              # Tasarım spesifikasyonları
```

## 📋 Konfigüratör Adımları

| Adım | Açıklama |
|------|----------|
| EBAT | Genişlik/yükseklik seçimi, fire uyarısı |
| KAĞIT | Naturel mat, Dokulu mat, Pürüzsüz mat, Parlak |
| KENARLIK | 4 yönlü kenarlık kontrolü |
| FOTOBLOK | Standart, Arşiv, Müze, Sentetik/Alüminyum |
| PASPARTU | Paspartu konfigürasyonu |
| ÇERÇEVE | Ahşap/Plastik profiller, renk seçenekleri |
| CAM | TruVue Müze, UV70, Mineral, Akrilik |
| TOPLAM | Özet ve sepete ekleme |

## 🔧 Geliştirme

```bash
# Test çalıştır
npm test

# Lint kontrolü
npm run lint

# Production build
npm run build
```

## 📄 Lisans

MIT
