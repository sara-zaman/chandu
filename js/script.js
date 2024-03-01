document.addEventListener("DOMContentLoaded", function () {
  const countrySelect = document.getElementById("countrySelect");
  const currencyInput = document.getElementById("currency");
  const nisabInput = document.getElementById("nisab");
  const calculateButton = document.getElementById("calculateButton");

  const countryData = {
    Bangladesh: {
      currency: "BDT",
      nisab: 53413.93,
    },
    "Saudi Arabia": {
      currency: "SAR",
      nisab: 1826.37,
    },
    USA: {
      currency: "USD",
      nisab: 487.01,
    },
    Europe: {
      currency: "EUR",
      nisab: 445.54,
    },
  };

  countrySelect.addEventListener("change", function () {
    const selectedCountry = countrySelect.value;
    currencyInput.value = countryData[selectedCountry].currency;
    nisabInput.value = countryData[selectedCountry].nisab.toFixed(2);
  });

  calculateButton.addEventListener("click", function () {
    let netWorth = 0;

    // Calculate total cash
    netWorth += parseFloat(document.getElementById("cashInHome").value) || 0;
    netWorth += parseFloat(document.getElementById("cashForFuture").value) || 0;
    netWorth +=
      parseFloat(document.getElementById("cashForInvestments").value) || 0;
    netWorth += parseFloat(document.getElementById("cashForLoans").value) || 0;

    // Calculate total silver and gold value
    netWorth += parseFloat(document.getElementById("silverValue").value) || 0;
    netWorth += parseFloat(document.getElementById("goldValue").value) || 0;

    // Calculate total stock value
    netWorth += parseFloat(document.getElementById("stockValue").value) || 0;

    // Calculate total liabilities
    const taxBillsRent =
      parseFloat(document.getElementById("taxBillsRent").value) || 0;
    const employeeSalaries =
      parseFloat(document.getElementById("employeeSalaries").value) || 0;
    const borrowedMoney =
      parseFloat(document.getElementById("borrowedMoney").value) || 0;

    const liabilities = taxBillsRent + employeeSalaries + borrowedMoney;
    netWorth -= liabilities;

    // Compare net worth with Nisab
    if (netWorth < nisabInput.value) {
      showModal(
        `Your net worth is ${netWorth.toFixed(2)} ${
          currencyInput.value
        }. You're NOT eligible for giving Zakat.`
      );
    } else {
      // Calculate Zakat amount
      const zakatAmount = netWorth * 0.025; // Zakat is 2.5% of net worth
      showModal(
        `Your net worth is ${netWorth.toFixed(2)} ${
          currencyInput.value
        }. Your payable Zakat amount is ${zakatAmount.toFixed(2)} ${
          currencyInput.value
        }.`
      );
    }
  });

  // Get the modal
  const modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  function showModal(message) {
    const zakatResult = document.getElementById("zakatResult");
    zakatResult.textContent = message;
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
