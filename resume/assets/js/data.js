const aboutStr =
  "<p>Working in a dynamic and professional environment, can learn and improve knowledge of HTML, CSS, Javascript to become a professional front-end developer.<br/></br>" +
  "More practice with JavaScript libraries like ReactJS.</p>";

const addressStr =
  "<p>La Xuan Oai street,<br/>" + " District 9,</br>" + "Ho Chi Minh city.</p>";

const phoneStr = "<p>0867677061</p>";
const emailStr = "<p>tienaqq@gmail.com</p>";

const address = window.addEventListener("load", () => {
  //   document.querySelector("#me").innerText = aboutMe;
  let aboutElem = document.getElementById("me");
  aboutElem.innerHTML = aboutStr;

  let addressElem = document.getElementById("address");
  addressElem.innerHTML = addressStr;

  let phoneElem = document.getElementById("phone");
  phoneElem.innerHTML = phoneStr;

  let emailElem = document.getElementById("email");
  emailElem.innerHTML = emailStr;
});

function generatePDR() {
  document.getElementById("download_pdf").style.margin = "0 auto";
  const element = document.getElementById("download_pdf");
  var opt = {
    margin: 0,
    filename: "Tien resume.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();

  html2pdf(element, opt);
}
