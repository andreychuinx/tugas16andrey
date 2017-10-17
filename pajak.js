/*
Perhitungan Pajak PPH21 Karyawan Tetap
untuk bisa memakai aplikasi ini ada beberapa pertanyaan yang harus di jawab sesuai format yang diberikan.
Perhitungan yang berada di aplikasi ini telah sesuai dengan peraturan PPH21 yang terdapat di web online-pajak.com/id/perhitungan-pph-21

*/

var gajiPokok = 6000000; //Gaji Pokok, di isi number
var tunjangan = 2000000; //Tunjangan, di isi number
var jkk = true; //Jaminan Kecelakaan Kerja, isi true jika dapat
var jk = true; //Jaminan Kematian, isi true jika dapat
var bulanTahunMasuk = 'Januari 2017'; //Isi dengan bulan dan tahun masuk dengan format "[bulan] [tahun]" seperti 'Januari 2017'

//Its begin
function ceil(num,percent){
  var ceil = Math.ceil(num * percent);
  return ceil;
}

function currencyIDR(num){
  var convert = num.toLocaleString('id');
  var currency = 'Rp. '+convert+' ,00';
  return currency;
}



var today=new Date();
var ArrMasuk=bulanTahunMasuk.split(' ');
var monthNow = today.getMonth()+1;
var yearNow = today.getFullYear();
var yearMasuk = Number(ArrMasuk[1]);
switch(ArrMasuk[0].toLowerCase()){
    case 'januari':{ namabulan=1; break;}
    case 'februari':{ namabulan=2; break;}
    case 'maret':{ namabulan=3; break;}
    case 'april':{ namabulan=4; break;}
    case 'mei':{ namabulan=5; break;}
    case 'juni':{ namabulan=6; break;}
    case 'juli':{ namabulan=7; break;}
    case 'agustus':{ namabulan=8; break;}
    case 'september':{ namabulan=9; break;}
    case 'oktober':{ namabulan=10; break;}
    case 'november':{ namabulan=11; break;}
    case 'desember':{ namabulan=12; break;}
    default:{ namabulan='salah input bulan';}
  }

if(typeof gajiPokok!== 'number'){
  console.log('salah input data gajiPokok');
}else if(typeof tunjangan!== 'number'){
  console.log('salah input data tunjangan');
}else if(typeof jkk!== 'boolean'){
  console.log('salah input data jaminan kecelakaan kerja');
}else if(typeof jk!== 'boolean'){
  console.log('salah input data jaminan kematian');
}else if(ArrMasuk.length > 2){
  console.log('salah input data bulanTahunMasuk');
}else if(namabulan==='salah input bulan'){
  console.log('salah input data bulan di bulanTahunMasuk');
}else if(yearMasuk === yearNow && namabulan > monthNow){
  console.log('salah input bulanTahunMasuk, masa belom masuk kerja udah minta PPH21');
}else if(yearMasuk > yearNow){
  console.log('salah input bulanTahunMasuk, masa belom masuk kerja udah minta PPH21');
}else{
  if(jkk === true){
    jkk = 0.24/100;
  }else{
    jkk = 0;
  }
  
  if(jk === true){
    jk = 0.3/100;
  }else{
    jk = 0;
  }
  if(yearNow !== ArrMasuk[1]){
    var rangeMonth = 13 - namabulan;
  }else if(yearNow === Arrmasuk[1]){
    var rangeMonth = 12;
  }
  
  var jkk = ceil(gajiPokok, jkk); //0.24% 
  var jk = ceil(gajiPokok, jk); //0.3% 
  var bruto = gajiPokok + tunjangan + jkk + jk;
  
  var bj = ceil(bruto, 5/100); //Biaya Jabatan
  var jht = ceil(gajiPokok, 2/100); //Jaminan Hari Tua
  var jp = ceil(gajiPokok, 1/100); //Jaminan Pensiun
  var neto = bruto - bj - jht - jp;
  
  var netoTahun = neto * rangeMonth;
  
  var ptkp = 54000000; //Penghasilan tidak kena pajak
  
  var pkps = netoTahun - ptkp;
  if(pkps<0){
    var pkps = 0;
  }
  pembulatan = pkps % 1000;
  pembulatan = pkps - pembulatan;
  if(pembulatan < 50000000){
    var pph = 5/100;
  }else if(pembulatan >=50000000 && pembulatan < 250000000){
    var pph = 15/100;
  }else if(pembulatan >=250000000 && pembulatan < 500000000){
    var pph = 25/100;
  }else if(pembulatan >= 500000000){
    var pph = 30/100;
  }else if(pembulatan === 0){
    pph = 0;
  }
  var pphCount = pph * pembulatan;
  var pphMonth = Math.ceil(pphCount / rangeMonth);
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var judul = [
    'Gaji Pokok : ',
    'Tunjangan : ',
    'Jaminan Kecelakaan kerja : ',
    'Jaminan Kematian : ',
    'Biaya Jabatan; ',
    'Iuran Jaminan Hari tua : ',
    'Jaminan Pensiun : ',
    'Penghasilan Bersih sebulan : ',
    'Penghasilan kena pajak setahun : ',
    'PPH Pasal 21 Bulan '+monthNames[today.getMonth()]+' adalah '];
  var hasil = [gajiPokok, tunjangan, jkk, jk, bj, jht, jp, neto, pphCount, pphMonth];
  for(i = 0 ; i < judul.length; i++){
    console.log(judul[i]+currencyIDR(hasil[i]));
  }
}
