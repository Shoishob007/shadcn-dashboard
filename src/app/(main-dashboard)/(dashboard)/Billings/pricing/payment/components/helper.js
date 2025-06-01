  // Helper function to format the card number
  export const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "") 
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
  };

// Helper function to format expiry date as MM/YY
export const formatExpiryDate = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{0,2})/, (match, p1, p2) => {
        if (p2) return `${p1}/${p2}`;
        return p1;
      })
      .slice(0, 5);
  };