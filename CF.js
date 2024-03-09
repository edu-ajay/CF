alert("OK")

const getLastTenDigits = (number) => {
  return number.toString().slice(-10);
};

const whatsAppAPI = async (wa_numbers, wa_message) => {
  //   pageLoading(true);
  try {
    let wa_numbers_new = 9910052219;
    var message = encodeURIComponent(wa_message); // Your message text
    // Check if wa_no is an array or a single number
    if (Array.isArray(wa_numbers)) {
      // If wa_number is an array, map over it, extract last 10 digits from each number, and join with commas
      wa_numbers_new = wa_numbers.map(getLastTenDigits).join(",");
    } else {
      // If wa_number is a single number, extract its last 10 digits directly
      wa_numbers_new = getLastTenDigits(wa_numbers);
    }

    const apiUrl = "http://whatsappapi.fastsmsindia.com/wapp/api/send?apikey=";
    const apiKey = "084f7c3e83eb42a2a52fe7bdf00fb683";

    const url = `${apiUrl}${apiKey}&mobile=${wa_numbers_new}&msg=${message}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to send WhatsApp message. Status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log(data);

    toastr.success("WhatsApp message sent successfully.");
    return data;
  } catch (error) {
    toastr.error(
      `There was a problem sending the WhatsApp message: ${error.toString()}`
    );
  } finally {
    // pageLoading(false);
  }
};
