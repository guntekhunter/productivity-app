/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function Description() {
  return (
    <section className="w-full flex justify-around">
      <div className="md:w-[60%] w-[90%] py-[2rem] space-y-[1rem]">
        <h1 className="font-bold md:text-[1.8rem] text-[1.6rem]">
          Pomodoro Timer Untuk Meningkatkan Produktifitas Teman-Teman Sekalinya
        </h1>
        <p className="font-bold text-[1.4rem]">Apa Itu Pomodoro ?</p>
        <p>
          Teknik Pomodoro adalah metode manajemen waktu yang populer yang
          membantu individu meningkatkan fokus, produktivitas, dan efisiensi
          kerja secara keseluruhan. Metode ini dikembangkan oleh Francesco
          Cirillo pada akhir tahun 1980-an dan sejak itu telah banyak diadopsi
          di berbagai industri dan bidang.
        </p>

        <p className="font-bold text-[1.4rem]">Bagaimana Teknik ini Bekerja?</p>
        <div className="flex space-x-3">
          <p>1.</p>
          <p>
            Tetapkan Tujuan: Mulailah dengan mendefinisikan tugas atau tujuan
            spesifik yang ingin Anda capai. Ini bisa berupa apa pun, mulai dari
            belajar untuk ujian, menyelesaikan tugas kerja, atau menangani
            proyek pribadi.
          </p>
        </div>
        <div className="flex space-x-3">
          <p>2.</p>
          <p>
            Atur Timer: Atur timer untuk interval waktu yang telah ditentukan,
            secara tradisional 25 menit, yang disebut "pomodoro". Selama periode
            ini, fokuslah sepenuhnya pada tugas yang sedang dilakukan,
            menghindari gangguan dan interupsi.
          </p>
        </div>
        <div className="flex space-x-3">
          <p>3.</p>
          <p>
            Bekerja dengan Konsentrasi: Konsentrasikan diri pada tugas dengan
            sepenuh hati hingga timer berbunyi. Periode ini ditujukan untuk
            bekerja dengan mendalam dan tanpa gangguan, memungkinkan Anda
            memasuki keadaan fokus tinggi dan membuat kemajuan signifikan.
          </p>
        </div>
        <div className="flex space-x-3">
          <p>4.</p>
          <p>
            Istirahat Singkat: Setelah timer berbunyi, ambil istirahat singkat,
            biasanya sekitar 5 menit. Gunakan waktu ini untuk bersantai,
            meregangkan tubuh, atau melakukan aktivitas lain untuk menyegarkan
            pikiran dan mempersiapkan diri untuk pomodoro berikutnya.
          </p>
        </div>
        <div className="flex space-x-3">
          <p>5.</p>
          <p>
            Ulangi dan Lacak: Setelah istirahat, atur ulang timer dan lanjutkan
            dengan pomodoro berikutnya. Setiap pomodoro yang selesai mewakili
            satu siklus kerja dan istirahat. Setelah menyelesaikan empat
            pomodoro, ambil istirahat lebih lama selama sekitar 15 menit.
          </p>
        </div>
        <p className="font-bold text-[1.4rem]">Apa Manfaat Pomodoro Teknik ?</p>
        <p>
          Teknik Pomodoro menggunakan prinsip timeboxing dan istirahat yang
          sering untuk menjaga fokus, mencegah kelelahan, dan meningkatkan
          produktivitas. Dengan membagi tugas menjadi interval yang terkelola,
          metode ini melawan kebiasaan menunda dan mendorong rasa pencapaian
          saat Anda menyelesaikan setiap pomodoro.
        </p>
      </div>
    </section>
  );
}
