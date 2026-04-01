// Basic JavaScript for Milk & Water Distribution System

// Function to load data from localStorage or initialize empty arrays
function loadData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Function to save data to localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Function to check if user is logged in
function isLoggedIn() {
    return sessionStorage.getItem('loggedIn') === 'true';
}

// Function to get current user role
function getUserRole() {
    return sessionStorage.getItem('userRole');
}

// Function to logout
function logout() {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('userRole');
    window.location.href = 'login.html';
}

// Function to handle login
function handleLogin(event) {
    event.preventDefault();
    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (password === 'admin') {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('userRole', role);
        window.location.href = 'index.html';
    } else {
        errorMessage.style.display = 'block';
    }
}

// Initialize data arrays
let products = loadData('products');
let customers = loadData('customers');
let orders = loadData('orders');
let deliveries = loadData('deliveries');
let vehicles = loadData('vehicles');
let users = loadData('users');
let expenses = loadData('expenses');

// Function to render table
function renderTable(tableId, data, columns) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = '';
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        if (tableId === 'stock-table') {
            // Add serial number for stock table
            const srCell = document.createElement('td');
            srCell.textContent = index + 1;
            row.appendChild(srCell);
        }
        columns.forEach(col => {
            const cell = document.createElement('td');
            if (col === 'actions' && tableId === 'stock-table') {
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'delete-btn';
                deleteBtn.onclick = () => deleteProduct(index);
                cell.appendChild(deleteBtn);
            } else {
                cell.textContent = item[col];
            }
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}

// Function to add product
function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const brand = document.getElementById('brand-name').value;
    const type = document.getElementById('product-type').value;
    const inwardDate = document.getElementById('inward-date').value;
    const inwardQuantity = document.getElementById('inward-quantity').value;
    const outwardDate = document.getElementById('outward-date').value;
    const outwardQuantity = document.getElementById('outward-quantity').value;
    const batch = document.getElementById('batch').value;
    const expiry = document.getElementById('expiry').value;

    products.push({ brand, name, type, inwardDate, inwardQuantity, outwardDate, outwardQuantity, batch, expiry });
    saveData('products', products);
    renderTable('stock-table', products, ['brand', 'name', 'type', 'inwardDate', 'inwardQuantity', 'outwardDate', 'outwardQuantity', 'batch', 'expiry', 'actions']);
    event.target.reset();
}

// Function to add customer
function addCustomer(event) {
    event.preventDefault();
    const name = document.getElementById('customer-name').value;
    const address = document.getElementById('customer-address').value;
    const mobile = document.getElementById('customer-mobile').value;
    const deliveryLocation = document.getElementById('delivery-location').value;
    const preferences = document.getElementById('preferences').value;

    customers.push({ name, address, mobile, deliveryLocation, preferences, dues: 0 });
    saveData('customers', customers);
    renderTable('customers-table', customers, ['name', 'address', 'mobile', 'deliveryLocation', 'preferences', 'dues']);
    event.target.reset();
}

// Function to create order
function createOrder(event) {
    event.preventDefault();
    const customer = document.getElementById('customer-select').value;
    const product = document.getElementById('product-select').value;
    const quantity = document.getElementById('quantity').value;
    const frequency = document.getElementById('frequency').value;
    const startDate = document.getElementById('start-date').value;

    orders.push({ id: Date.now(), customer, product, quantity, frequency, startDate, status: 'Active' });
    saveData('orders', orders);
    renderTable('orders-table', orders, ['id', 'customer', 'product', 'quantity', 'frequency', 'status']);
    event.target.reset();
}

// Function to assign delivery
function assignDelivery(event) {
    event.preventDefault();
    const orderId = document.getElementById('order-id').value;
    const driver = document.getElementById('driver').value;
    const vehicle = document.getElementById('vehicle').value;
    const route = document.getElementById('route').value;

    deliveries.push({ orderId, driver, vehicle, route, status: 'Pending' });
    saveData('deliveries', deliveries);
    renderTable('delivery-table', deliveries, ['orderId', 'driver', 'vehicle', 'route', 'status']);
    event.target.reset();
}

// Function to add vehicle
function addVehicle(event) {
    event.preventDefault();
    const name = document.getElementById('vehicle-name').value;
    const type = document.getElementById('vehicle-type').value;
    const capacity = document.getElementById('capacity').value;
    const assignedDriver = document.getElementById('assigned-driver').value;

    vehicles.push({ name, type, capacity, assignedDriver, fuelExpenses: 0, maintenance: '' });
    saveData('vehicles', vehicles);
    renderTable('vehicles-table', vehicles, ['name', 'type', 'capacity', 'assignedDriver', 'fuelExpenses', 'maintenance']);
    event.target.reset();
}

// Function to add user
function addUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const role = document.getElementById('role').value;
    const permissions = document.getElementById('permissions').value;

    users.push({ username, role, permissions });
    saveData('users', users);
    renderTable('users-table', users, ['username', 'role', 'permissions']);
    event.target.reset();
}

// Function to add expense
function addExpense(event) {
    event.preventDefault();
    const type = document.getElementById('expense-type').value;
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;

    expenses.push({ type, amount, description, date: new Date().toLocaleDateString() });
    saveData('expenses', expenses);
    renderTable('expenses-table', expenses, ['type', 'amount', 'description', 'date']);
    event.target.reset();
}

// Event listeners (to be called on specific pages)
function initProductsPage() {
    renderTable('stock-table', products, ['brand', 'name', 'type', 'inwardDate', 'inwardQuantity', 'outwardDate', 'outwardQuantity', 'batch', 'expiry', 'actions']);
    document.getElementById('add-product-form').addEventListener('submit', addProduct);
    document.getElementById('print-btn').addEventListener('click', () => {
        const main = document.querySelector('main');
        const forms = main.querySelectorAll('form');
        forms.forEach(form => form.style.display = 'none');
        const dateDiv = document.createElement('div');
        dateDiv.innerHTML = `<h3>Report Date: ${new Date().toLocaleDateString()}</h3>`;
        main.insertBefore(dateDiv, main.firstChild);
        html2pdf().set({
            margin: 0.5,
            filename: 'report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true, letterRendering: true, allowTaint: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape', fontSize: 8 }
        }).from(main).save().then(() => {
            forms.forEach(form => form.style.display = '');
            main.removeChild(dateDiv);
        });
    });
}

function initCustomersPage() {
    renderTable('customers-table', customers, ['name', 'address', 'mobile', 'deliveryLocation', 'preferences', 'dues']);
    document.getElementById('add-customer-form').addEventListener('submit', addCustomer);
    document.getElementById('print-btn').addEventListener('click', () => {
        const main = document.querySelector('main');
        const forms = main.querySelectorAll('form');
        forms.forEach(form => form.style.display = 'none');
        const dateDiv = document.createElement('div');
        dateDiv.innerHTML = `<h3>Report Date: ${new Date().toLocaleDateString()}</h3>`;
        main.insertBefore(dateDiv, main.firstChild);
        html2pdf().set({
            margin: 0.5,
            filename: 'customers-report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true, letterRendering: true, allowTaint: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape', fontSize: 8 }
        }).from(main).save().then(() => {
            forms.forEach(form => form.style.display = '');
            main.removeChild(dateDiv);
        });
    });
}

function initOrdersPage() {
    renderTable('orders-table', orders, ['id', 'customer', 'product', 'quantity', 'frequency', 'status']);
    document.getElementById('create-order-form').addEventListener('submit', createOrder);
    document.getElementById('print-btn').addEventListener('click', () => {
        const main = document.querySelector('main');
        const forms = main.querySelectorAll('form');
        forms.forEach(form => form.style.display = 'none');
        const dateDiv = document.createElement('div');
        dateDiv.innerHTML = `<h3>Report Date: ${new Date().toLocaleDateString()}</h3>`;
        main.insertBefore(dateDiv, main.firstChild);
        html2pdf().set({
            margin: 0.5,
            filename: 'orders-report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true, letterRendering: true, allowTaint: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape', fontSize: 8 }
        }).from(main).save().then(() => {
            forms.forEach(form => form.style.display = '');
            main.removeChild(dateDiv);
        });
    });
}

function initDeliveryPage() {
    renderTable('delivery-table', deliveries, ['orderId', 'driver', 'vehicle', 'route', 'status']);
    document.getElementById('assign-delivery-form').addEventListener('submit', assignDelivery);
    document.getElementById('print-btn').addEventListener('click', () => {
        const main = document.querySelector('main');
        const forms = main.querySelectorAll('form');
        forms.forEach(form => form.style.display = 'none');
        const dateDiv = document.createElement('div');
        dateDiv.innerHTML = `<h3>Report Date: ${new Date().toLocaleDateString()}</h3>`;
        main.insertBefore(dateDiv, main.firstChild);
        html2pdf().set({
            margin: 0.5,
            filename: 'delivery-report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true, letterRendering: true, allowTaint: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape', fontSize: 8 }
        }).from(main).save().then(() => {
            forms.forEach(form => form.style.display = '');
            main.removeChild(dateDiv);
        });
    });
}

function initVehiclesPage() {
    renderTable('vehicles-table', vehicles, ['name', 'type', 'capacity', 'assignedDriver', 'fuelExpenses', 'maintenance']);
    document.getElementById('add-vehicle-form').addEventListener('submit', addVehicle);
    document.getElementById('print-btn').addEventListener('click', () => {
        const main = document.querySelector('main');
        const forms = main.querySelectorAll('form');
        forms.forEach(form => form.style.display = 'none');
        const dateDiv = document.createElement('div');
        dateDiv.innerHTML = `<h3>Report Date: ${new Date().toLocaleDateString()}</h3>`;
        main.insertBefore(dateDiv, main.firstChild);
        html2pdf().set({
            margin: 0.5,
            filename: 'vehicles-report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true, letterRendering: true, allowTaint: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait', fontSize: 8 }
        }).from(main).save().then(() => {
            forms.forEach(form => form.style.display = '');
            main.removeChild(dateDiv);
        });
    });
}

function initUsersPage() {
    renderTable('users-table', users, ['username', 'role', 'permissions']);
    document.getElementById('add-user-form').addEventListener('submit', addUser);
    document.getElementById('print-btn').addEventListener('click', () => {
        const main = document.querySelector('main');
        const forms = main.querySelectorAll('form');
        forms.forEach(form => form.style.display = 'none');
        const dateDiv = document.createElement('div');
        dateDiv.innerHTML = `<h3>Report Date: ${new Date().toLocaleDateString()}</h3>`;
        main.insertBefore(dateDiv, main.firstChild);
        html2pdf().set({
            margin: 0.5,
            filename: 'users-report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true, letterRendering: true, allowTaint: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait', fontSize: 8 }
        }).from(main).save().then(() => {
            forms.forEach(form => form.style.display = '');
            main.removeChild(dateDiv);
        });
    });
}

function initAccountsPage() {
    renderTable('expenses-table', expenses, ['type', 'amount', 'description', 'date']);
    document.getElementById('add-expense-form').addEventListener('submit', addExpense);
    document.getElementById('print-btn').addEventListener('click', () => {
        const main = document.querySelector('main');
        const forms = main.querySelectorAll('form');
        forms.forEach(form => form.style.display = 'none');
        const dateDiv = document.createElement('div');
        dateDiv.innerHTML = `<h3>Report Date: ${new Date().toLocaleDateString()}</h3>`;
        main.insertBefore(dateDiv, main.firstChild);
        html2pdf().set({
            margin: 0.5,
            filename: 'accounts-report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true, letterRendering: true, allowTaint: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape', fontSize: 8 }
        }).from(main).save().then(() => {
            forms.forEach(form => form.style.display = '');
            main.removeChild(dateDiv);
        });
    });
}

// Initialize dashboard stats
function initDashboard() {
    document.getElementById('today-deliveries').textContent = deliveries.filter(d => d.status === 'Delivered').length;
    document.getElementById('pending-payments').textContent = customers.reduce((sum, c) => sum + c.dues, 0);
    document.getElementById('vehicle-availability').textContent = vehicles.length;
}

// Initialize login page
function initLoginPage() {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
}

// Call appropriate init function based on current page
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;

    // Check if user is logged in for protected pages
    if (!path.includes('login.html') && !isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    if (path.includes('login.html')) {
        initLoginPage();
    } else if (path.includes('products.html')) {
        initProductsPage();
    } else if (path.includes('customers.html')) {
        initCustomersPage();
    } else if (path.includes('orders.html')) {
        initOrdersPage();
    } else if (path.includes('delivery.html')) {
        initDeliveryPage();
    } else if (path.includes('vehicles.html')) {
        initVehiclesPage();
    } else if (path.includes('users.html')) {
        initUsersPage();
    } else if (path.includes('accounts.html')) {
        initAccountsPage();
    } else if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        initDashboard();
    }

    // Add logout button to header if logged in
    if (isLoggedIn()) {
        const header = document.querySelector('header');
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Logout';
        logoutBtn.style.cssText = 'position: absolute; top: 20px; right: 20px; padding: 10px 20px; background: rgba(255,255,255,0.2); color: white; border: none; border-radius: 25px; cursor: pointer;';
        logoutBtn.onclick = logout;
        header.appendChild(logoutBtn);

        // Show admin-only elements if user is admin
        if (getUserRole() === 'admin') {
            const adminElements = document.querySelectorAll('.admin-only');
            adminElements.forEach(element => {
                element.style.display = 'block';
            });
        }
    }
});
