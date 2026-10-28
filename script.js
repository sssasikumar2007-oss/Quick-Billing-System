
let items = [];

function addItem() {
    const product = document.getElementById("product").value.trim();
    const price = Number(document.getElementById("price").value);
    const quantity = Number(document.getElementById("quantity").value);

    if (!product || price <= 0 || quantity <= 0 ||
        !Number.isFinite(price) || !Number.isFinite(quantity)) {
        alert("Enter a valid product, price and quantity.");
        return;
    }

    items.push({
        product: product,
        price: price,
        quantity: quantity
    });

    document.getElementById("product").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = 1;

    displayItems();
}

function displayItems() {
    const tbody = document.getElementById("billItems");
    tbody.innerHTML = "";

    items.forEach((item, index) => {
        const row = document.createElement("tr");

        const values = [
            item.product,
            item.price.toFixed(2),
            item.quantity,
            (item.price * item.quantity).toFixed(2)
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const removeButton = document.createElement("button");

        removeButton.textContent = "Remove";
        removeButton.className = "remove";
        removeButton.onclick = function () {
            items.splice(index, 1);
            displayItems();
        };

        actionCell.appendChild(removeButton);
        row.appendChild(actionCell);
        tbody.appendChild(row);
    });

    calculateBill();
}

function calculateBill() {
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    let discount = Number(document.getElementById("discount").value);
    let tax = Number(document.getElementById("tax").value);

    discount = Number.isFinite(discount)
        ? Math.min(100, Math.max(0, discount)) : 0;

    tax = Number.isFinite(tax) ? Math.max(0, tax) : 0;

    const discountedTotal = subtotal * (1 - discount / 100);
    const grandTotal = discountedTotal * (1 + tax / 100);

    document.getElementById("subtotal").textContent =
        subtotal.toFixed(2);

    document.getElementById("grandTotal").textContent =
        grandTotal.toFixed(2);
}

function printBill() {
    if (items.length === 0) {
        alert("Please add at least one product.");
        return;
    }

    const payment = document.getElementById("payment").value;
    const total = document.getElementById("grandTotal").textContent;

    document.getElementById("invoice").innerHTML =
        "<h2>Quick Billing System - Invoice</h2>" +
        "<p>Date: " + new Date().toLocaleString() + "</p>" +
        "<p>Payment Method: " + payment + "</p>" +
        "<p>Grand Total: ₹" + total + "</p>";

    window.print();
}

function clearBill() {
    items = [];
    document.getElementById("invoice").innerHTML = "";
    document.getElementById("discount").value = 0;
    document.getElementById("tax").value = 5;
    document.getElementById("payment").value = "Cash";

    displayItems();
}
