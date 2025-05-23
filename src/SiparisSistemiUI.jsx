
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function SiparisSistemiUI() {
  const [siparisler, setSiparisler] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "siparisler"));
      setSiparisler(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Sipariş Listesi</h2>
      <ul>
        {siparisler.map(s => (
          <li key={s.id}>{s.aciklama} - {s.miktar} adet</li>
        ))}
      </ul>
    </div>
  );
}
