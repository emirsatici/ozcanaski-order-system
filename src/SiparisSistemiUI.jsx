
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import { jsPDF } from "jspdf";
import { db } from "./firebaseConfig";

export default function SiparisListesiUI({ kullaniciEmail }) {
  const [siparisler, setSiparisler] = useState([]);

  useEffect(() => {
    const verileriGetir = async () => {
      const snapshot = await getDocs(collection(db, "siparisler"));
      const veri = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filtreli = veri.filter(s => s.kullanici === kullaniciEmail);
      setSiparisler(filtreli);
    };
    verileriGetir();
  }, [kullaniciEmail]);

  const guncelleDurum = async (id, yeniDurum) => {
    const siparisRef = doc(db, "siparisler", id);
    const mevcut = siparisler.find(s => s.id === id);
    const yeniLog = [...(mevcut.log || []), { durum: yeniDurum, zaman: Timestamp.now() }];
    await updateDoc(siparisRef, { durum: yeniDurum, log: yeniLog });
    setSiparisler(prev =>
      prev.map(s => s.id === id ? { ...s, durum: yeniDurum, log: yeniLog } : s)
    );
  };

  const pdfOlustur = (siparis) => {
    const docu = new jsPDF();
    docu.setFontSize(14);
    docu.text("Sipariş Bilgisi", 20, 20);
    docu.text(`Mağaza: ${siparis.magaza}`, 20, 35);
    docu.text(`Miktar: ${siparis.miktar}`, 20, 45);
    docu.text(`Fiyat: ${siparis.fiyat}`, 20, 55);
    docu.text(`Açıklama: ${siparis.aciklama}`, 20, 65);
    docu.text("Durum Geçmişi:", 20, 80);
    (siparis.log || []).forEach((item, index) => {
      docu.text(`- ${item.durum} (${item.zaman.toDate().toLocaleString()})`, 25, 90 + index * 10);
    });
    docu.save(`siparis_${siparis.id}.pdf`);
  };

  return (
    <div>
      <h2>Sipariş Listesi</h2>
      {siparisler.map((siparis) => (
        <div key={siparis.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Mağaza:</strong> {siparis.magaza}</p>
          <p><strong>Miktar:</strong> {siparis.miktar}</p>
          <p><strong>Fiyat:</strong> {siparis.fiyat}</p>
          <p><strong>Açıklama:</strong> {siparis.aciklama}</p>
          <p><strong>Durum:</strong> {siparis.durum || "Bekliyor"}</p>

          <button onClick={() => guncelleDurum(siparis.id, "Hazırlanıyor")}>Hazırlanıyor</button>
          <button onClick={() => guncelleDurum(siparis.id, "Yola Çıktı")}>Yola Çıktı</button>
          <button onClick={() => pdfOlustur(siparis)}>PDF Oluştur</button>
        </div>
      ))}
    </div>
  );
}
