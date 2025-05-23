import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import "./index.css";

export default function SiparisSistemiUI({ aktifKullanici }) {
  const [miktar, setMiktar] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [siparisler, setSiparisler] = useState([]);

  const siparisEkle = async () => {
    if (!miktar || !fiyat || !aciklama) return alert("Tüm alanları doldurun!");
    await addDoc(collection(db, "siparisler"), {
      miktar,
      fiyat,
      aciklama,
      kullanici: aktifKullanici,
      durum: "hazırlanıyor",
      tarih: Timestamp.now(),
    });
    setMiktar("");
    setFiyat("");
    setAciklama("");
    siparisleriGetir();
  };

  const siparisleriGetir = async () => {
    const querySnapshot = await getDocs(collection(db, "siparisler"));
    const veriler = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.kullanici === aktifKullanici) {
        veriler.push({ id: doc.id, ...data });
      }
    });
    setSiparisler(veriler);
  };

  const durumuGuncelle = async (id, yeniDurum) => {
    const ref = doc(db, "siparisler", id);
    await updateDoc(ref, { durum: yeniDurum });
    siparisleriGetir();
  };

  useEffect(() => {
    siparisleriGetir();
  }, [aktifKullanici]);

  return (
    <div className="container">
      <h2>Sipariş Oluştur</h2>
      <input
        type="text"
        placeholder="Miktar"
        value={miktar}
        onChange={(e) => setMiktar(e.target.value)}
      />
      <input
        type="text"
        placeholder="Fiyat"
        value={fiyat}
        onChange={(e) => setFiyat(e.target.value)}
      />
      <input
        type="text"
        placeholder="Açıklama"
        value={aciklama}
        onChange={(e) => setAciklama(e.target.value)}
      />
      <button onClick={siparisEkle}>Sipariş Ekle</button>

      <h2>Sipariş Listesi</h2>
      <ul>
        {siparisler.map((siparis) => (
          <li key={siparis.id}>
            <b>{siparis.aciklama}</b> - {siparis.miktar} adet - {siparis.fiyat}₺
            <br />
            Durum: {siparis.durum}
            <button onClick={() => durumuGuncelle(siparis.id, "hazır")}>
              Hazırla
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
