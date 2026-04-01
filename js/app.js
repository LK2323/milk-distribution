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

    // Redirect to products page
    window.location.href = 'products.html';
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

    // Redirect to customers page
    window.location.href = 'customers.html';
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

    // Redirect to orders page
    window.location.href = 'orders.html';
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

    // Redirect to delivery page
    window.location.href = 'delivery.html';
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

    // Redirect to vehicles page
    window.location.href = 'vehicles.html';
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

    // Redirect to users page
    window.location.href = 'users.html';
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

    // Redirect to accounts page
    window.location.href = 'accounts.html';
}

// --- (Rest of init functions remain same) ---
// Only change was adding window.location.href at the end of form handlers
