# 📷 3D Sinematik Kamera Vizörü Scrollytelling Deneyimi

**Three.js**, **GSAP ScrollTrigger** ve **Vite** ile geliştirilmiş son teknoloji, web tabanlı bir 3D scrollytelling deneyimi. Proje, kullanıcıyı nostaljik bir Canon analog fotoğraf makinesinin dışından başlatan, optik vizör camından içeri daldıran, dahili lens tünelinden geçiren ve atmosferik bir çimenlik alana fırlatarak narin bir orkide çiçeğine ve hareketli bir 3D imza amblemine makro odaklanan kesintisiz, sinematik bir görsel yolculuğa çıkarır.

---

## ✨ Özellikler

- **🎬 GSAP ScrollTrigger Destekli Sinematik Kamera Rotası**
  - **1. Aşama: Arkadan Yaklaşma:** Kamera gövdesine arkadan yumuşak bir sinematik açıyla yaklaşma ve optik vizör penceresiyle tam hizalanma.
  - **2. Aşama: Vizörden Giriş:** Vizör camının içinden geçerek dahili optik gövdenin içine pürüzsüz dalış.
  - **3. Aşama: Lens Tüneline İniş:** Lens elemanları boyunca optik merkez eksenine (`Y: 0.24`) kontrollü iniş ve eşzamanlı pozlama karartma geçişi.
  - **4. Aşama: Lensten Doğaya Çıkış:** Ön lensten aniden dışarı fırlayarak geniş, atmosferik bir çimenlik vadiye çıkış; ani ışık patlaması (bloom) ve ton haritalama (tone mapping) adaptasyonu.
  - **5. Aşama: Çiçeğe Makro Odak ve İmza:** Çiçek açan orkideye sakin ve yavaşlayan bir makro odaklanma ile arkadan fırlayan dinamik bir 3D imza amblemi.

- **🕹️ OrbitControls & GSAP Hibrit Ray Sistemi**
  - Kullanıcı istediği an sol tık ile serbestçe döndürme (rotate) ve sağ tık ile sahneyi kaydırma (pan) yaparak ortamı serbestçe inceleyebilir.
  - Kullanıcı fare tekerleğini döndürdüğü veya sayfayı kaydırdığı anda, kamera herhangi bir takılma veya sıçrama olmadan yumuşak bir geçişle (`GSAP tween & Vector3.lerpVectors`) sinematik yönetmen rayına pürüzsüzce geri döner.

- **🌱 Prosedürel Çimen Arazisi ve Rüzgar Fiziği**
  - `THREE.InstancedMesh` kullanılarak tek bir çizim çağrısında (single draw call) oluşturulan 3.000'den fazla bağımsız çimen yaprağı.
  - Kamera gövdesinin içi ve lens tüneli koridorunda çimen çıkmasını engelleyen özel dışlama bölgeleri (exclusion zones).
  - Animasyon döngüsünde gerçek zamanlı hesaplanan sürekli ve doğal rüzgar dalgalanma fiziği.

- **📸 Yüksek Kaliteli GLTF Model Entegrasyonu**
  - Özel cam materyali geçirgenlik ve şeffaflık optimizasyonlarına sahip nostaljik **Canon Analog Fotoğraf Makinesi** 3D modeli.
  - Çift taraflı botanik materyallere ve doğal rüzgar salınım fiziğine sahip detaylı **Orkide Çiçeği** 3D modeli.

- **💎 Süzülen Çift Taraflı 3D "made by loxiw" İmzası**
  - Bellek içi yüksek çözünürlüklü Canvas üzerinde yumuşak gölgeli tipografi ile dinamik olarak çizilen doku.
  - Monitör yenileme hızından (Hz) bağımsız, tek yöne doğru sürekli sakin dönüş ve dikey süzülme (bobbing) animasyonu.
  - Çift taraflı görünüm ve optimize edilmiş derinlik testi.

---

## 🛠️ Kullanılan Teknolojiler

- **[Three.js](https://threejs.org/)** (v0.187+) - WebGL 3D render motoru, materyaller, instanced mesh'ler ve sahne aydınlatması.
- **[GSAP & ScrollTrigger](https://greensock.com/scrolltrigger/)** - Scrollytelling zaman çizelgesi, scrub interpolasyonu ve dinamik pozlama geçişleri.
- **[Vite](https://vitejs.dev/)** (v8+) - Yüksek performanslı modern geliştirme sunucusu ve derleyici.
- **JavaScript (ES6+)** - Modüler mimari ve 3D vektör matematiği.

---

## 🕹️ Kontroller ve Etkileşim

| Etkileşim | Eylem |
| --- | --- |
| **Kaydırma / Fare Tekerleği (Scroll)** | Sinematik scrollytelling rotasında ileri/geri hareket |
| **Sol Tık + Sürükle** | Sahneyi ve kamerayı serbestçe döndürerek incele |
| **Sağ Tık + Sürükle** | Kamera bakış açısını kaydır (Pan) |
| **Tekrar Kaydırma Yapıldığında** | Otomatik olarak yumuşakça (lerp) sinematik raya geri döner |

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler

Bilgisayarınızda [Node.js](https://nodejs.org/) (v18 veya üzeri önerilir) kurulu olmalıdır.

### Adım Adım Kurulum

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/loxiwwxd/3d-cinematic-camera-scrollytelling.git
   cd 3d-cinematic-camera-scrollytelling
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

4. Canlı (production) derleme alın:
   ```bash
   npm run build
   ```

5. Derlemeyi önizleyin:
   ```bash
   npm run preview
   ```

---

## 📁 Proje Dosya Yapısı

```
├── public/
│   ├── models/
│   │   ├── camera.glb       # Vintage Canon kamera 3D modeli
│   │   └── flower.glb       # Orkide çiçeği 3D modeli
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── main.js              # Three.js sahnesi, ışıklar, yükleyiciler, GSAP timeline ve döngü
│   └── style.css            # Canvas stilleri ve scroll yüksekliği düzeni
├── index.html               # Canvas kapsayıcısı ve giriş noktası
├── package.json             # Bağımlılıklar ve npm scriptleri
└── README.md                # Proje dokümantasyonu
```

---

## 👤 Geliştirici

**loxiw** tarafından geliştirilmiştir.

- GitHub: [@loxiwwxd](https://github.com/loxiwwxd)
