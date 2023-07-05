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
          Konsultan adalah sebuah sebuah chatbot yang menggunakan teknologi AI
          untuk membantu anda dalam melewati masalah mental atau burnout yang
          sedang anda hadapi, atau bahkan membantu anda menyelesaikan tugas
        </p>

        <p className="font-bold text-[1.4rem]">
          Apa batasan halaman konsultasi ini?
        </p>
        <div className="flex space-x-3">
          <p>
            Perlu diperhatikan jika halaman ini menggunakan AI atau kecerdasan
            buatan yang hanya dapat membantu anda memberikan saran dan masukan
            mengenai kesehatan mental, pengembangan diri dan memberikan saran
            yang membantu menyelesaikan tugas, jika anda mengalami masalah
            mental yang berat lebih disarankan untuk melakukan konsultasi
            langsung dengan psikolog atau psikiater untuk penenganan lebih
            lanjut. Tapi kami berharap halaman ini dapat membantu meringankan
            beban anda
          </p>
        </div>
      </div>
    </section>
  );
}
