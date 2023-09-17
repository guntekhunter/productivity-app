import React from "react";

export default function ConsultationDescription() {
  return (
    <section className="w-full flex">
      <div className="w-[90%] py-[2rem] space-y-[1rem]">
        <h1 className="font-bold text-[1.8rem]">
          Halaman Konsultan ini untuk apa?
        </h1>
        <p className="font-bold text-[1.4rem]">Apa Itu Konsultan?</p>
        <p>
          Konsultan adalah sebuah sebuah chatbot yang menggunakan
          teknologikecerdasan buatan untuk membantu anda dalam melewati masalah
          yang sedang anda hadapi, atau bahkan membantu anda menyelesaikan tugas
          dan menjawab semua pertanyaan teman teman sekalinya, silahkan klik
          tombol copy untuk menyalin teks jawaban dan paste dimanapun
          teman-teman mahu
        </p>

        <p className="font-bold text-[1.4rem]">
          Apa batasan halaman konsultasi ini?
        </p>
        <div className="flex space-x-3">
          <p>
            Perlu diperhatikan jika halaman ini menggunakan AI atau kecerdasan
            buatan yang hanya dapat membantu anda memberikan saran dan masukan
            yang bisa saja salah
          </p>
        </div>
      </div>
    </section>
  );
}
