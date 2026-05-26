// BUILD WHATSAPP ORDER MESSAGE
// Called when buyer clicks Order Now on a product
// Opens WhatsApp with a pre-filled message to the seller


const buildWhatsAppMessage = ({
    productImage,
    productName,
    price,
    color,
    size,
    quantity,
}) => {
    
    // calculate total - price multiplied by quantity
    const total = price * quantity;

    // format price and total with naira symbol and commas
    const formattedPrice = `₦${price.toLocaleString()}`;
    const formattedTotal = `₦${total.toLocaleString()}`;

    // start building the message
    let message = `Hi, I'm interested in this product:\n\n`;

    // image link - seller taps to see the product
    message += `Image: ${productImage}\n`;

    // product name
    message += `Product: ${productName}\n`;

    // price
    message += `Price: ${formattedPrice}\n`;

    // color -only add if seller set colors on the product
    if(color){
        message += `Color: ${color}\n`;
    }

    // size - only add if seller add size on the product

    if (size){
        message += `Size: ${size}\n`;
    }

    // quantity
    message += `Quantity: ${quantity}\n`;

    // total
    message += `Total: ${formattedTotal}\n`;

    // closing line
    message += `\nPlease confirm availability.`;

    return message;

};

// BUILD WHATSAPP URL
// Takes the seller's WhatsApp number and the message
// Returns a full WhatsApp URL the browser can open

const buildWhatsAppURL = ({
    whatsappNumber,
    productImage,
    productName,
    price,
    color,
    size,
    quantity,
}) => {
    // build the message first
    const message = buildWhatsAppMessage({
        productImage,
        productName,
        price,
        color,
        size,
        quantity,
    });

    // // encodeURIComponent converts the message into a URL safe string
    // spaces become %20, newlines become %0A etc
    // without this the URL would break

    const encodedMessage = encodeURIComponent(message);

    // wa.me is WhatsApp's official link format
    // number must include country code with no + or spaces
    // e.g 2348012345678 not +234 801 234 5678

    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
};

export {buildWhatsAppURL};