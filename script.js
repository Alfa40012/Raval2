// Theme Toggle with smooth transition
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  let theme = "light";
  if (document.body.classList.contains("dark-mode")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
  
  // Add a subtle animation effect
  document.body.style.transition = "all 0.3s ease";
  setTimeout(() => {
    document.body.style.transition = "";
  }, 300);
}

// Apply saved theme on load with smooth transition
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  
  // Add loading animation
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Enhanced Back to Top Button with smooth scroll
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  const backToTopBtn = document.querySelector(".back-to-top");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
    backToTopBtn.style.opacity = "1";
  } else {
    backToTopBtn.style.opacity = "0";
    setTimeout(() => {
      if (backToTopBtn.style.opacity === "0") {
        backToTopBtn.style.display = "none";
      }
    }, 300);
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Enhanced Copy Code and Send to Telegram with better feedback
function copyAndSend() {
  const copyText = document.getElementById("copyText");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  
  // Modern clipboard API with fallback
  if (navigator.clipboard) {
    navigator.clipboard.writeText(copyText.value).then(() => {
      showToast("تم النسخ بنجاح!");
    }).catch(() => {
      // Fallback to execCommand
      document.execCommand("copy");
      showToast("تم النسخ بنجاح!");
    });
  } else {
    document.execCommand("copy");
    showToast("تم النسخ بنجاح!");
  }
}

// Enhanced Copy to Clipboard for individual codes
function copyToClipboard(elementId) {
  const copyText = document.getElementById(elementId);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(copyText.value).then(() => {
      showNotification("تم النسخ بنجاح!");
    }).catch(() => {
      document.execCommand("copy");
      showNotification("تم النسخ بنجاح!");
    });
  } else {
    document.execCommand("copy");
    showNotification("تم النسخ بنجاح!");
  }
}

// Enhanced notification system
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";
  notification.style.opacity = "1";
  notification.style.transform = "translateX(-50%) translateY(0)";
  
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(-50%) translateY(-20px)";
    setTimeout(() => {
      notification.style.display = "none";
    }, 300);
  }, 2500);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// Enhanced Clock and Countdown with better formatting
function updateClock() {
  const now = new Date();
  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");

  if (timeElement) {
    const timeString = now.toLocaleTimeString("ar-EG", { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit",
      hour12: false
    });
    timeElement.textContent = timeString;
  }
  
  if (dateElement) {
    const dateString = now.toLocaleDateString("ar-EG", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
    dateElement.textContent = dateString;
  }
}

// Enhanced countdown with better visual feedback
function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  if (!countdownElement) return;

  const now = new Date();
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const timeLeft = endOfDay - now;

  if (timeLeft < 0) {
    countdownElement.textContent = "انتهى العرض!";
    countdownElement.style.color = "#d32f2f";
    return;
  }

  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  countdownElement.textContent = timeString;
  
  // Add urgency color as time runs out
  if (hours < 1) {
    countdownElement.style.color = "#d32f2f";
  } else if (hours < 3) {
    countdownElement.style.color = "#ff9800";
  }
}

// Start timers
setInterval(updateClock, 1000);
setInterval(updateCountdown, 1000);
updateClock();
updateCountdown();

// Enhanced Media Filter with smooth animations
function filterMedia(category) {
  const mediaItems = document.querySelectorAll(".media-item");
  
  // First fade out all items
  mediaItems.forEach(item => {
    item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    item.style.opacity = "0";
    item.style.transform = "scale(0.9)";
  });
  
  // Then show/hide based on category after animation
  setTimeout(() => {
    mediaItems.forEach(item => {
      if (category === "all" || item.classList.contains(category)) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 50);
      } else {
        item.style.display = "none";
      }
    });
  }, 300);

  // Update active button style
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  filterButtons.forEach(button => {
    button.classList.remove("active");
  });
  
  // Find and activate the clicked button
  const activeButton = Array.from(filterButtons).find(button => 
    button.getAttribute('onclick').includes(`'${category}'`)
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

// Form submission handler with validation
document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.getElementById("subscribe-form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const plan = document.getElementById("plan").value;
      
      if (!name || !email || !plan) {
        showNotification("يرجى ملء جميع الحقول المطلوبة");
        return;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification("يرجى إدخال بريد إلكتروني صحيح");
        return;
      }
      
      // Simulate form submission
      showNotification("تم إرسال طلب الاشتراك بنجاح! سنتواصل معك قريباً");
      subscribeForm.reset();
    });
  }
  
  // Initialize filter to show all on load
  filterMedia("all");
  
  // Add smooth scroll to navigation links
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Add intersection observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});



// Payment Gateway Functionality with Backend Integration
let selectedPlan = null;
let selectedPrice = 0;
let backendUrl = 'http://localhost:5000'; // Backend API URL

// Initialize payment gateway on page load
document.addEventListener("DOMContentLoaded", () => {
  initializePaymentGateway();
  loadSubscriptionPlans();
});

function initializePaymentGateway() {
  const planCards = document.querySelectorAll('.plan-card');
  const paymentButtons = document.querySelectorAll('.payment-btn');
  
  // Add click handlers for plan selection
  planCards.forEach(card => {
    card.addEventListener('click', () => selectPlan(card));
  });
  
  // Initially disable payment buttons
  paymentButtons.forEach(btn => {
    btn.disabled = true;
  });
}

async function loadSubscriptionPlans() {
  try {
    const response = await fetch(`${backendUrl}/api/payment/plans`);
    const data = await response.json();
    
    if (data.success) {
      console.log('Subscription plans loaded:', data.plans);
      // Plans are already hardcoded in HTML, but we could update them dynamically here
    }
  } catch (error) {
    console.error('Error loading subscription plans:', error);
  }
}

function selectPlan(selectedCard) {
  // Remove selection from all cards
  document.querySelectorAll('.plan-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  // Add selection to clicked card
  selectedCard.classList.add('selected');
  
  // Get plan details
  const planType = selectedCard.dataset.plan;
  const price = parseInt(selectedCard.dataset.price);
  
  // Update global variables
  selectedPlan = planType;
  selectedPrice = price;
  
  // Update UI
  updatePaymentSummary();
  enablePaymentButtons();
}

function updatePaymentSummary() {
  const planNames = {
    'monthly': 'باقة شهرية',
    'quarterly': 'باقة ربع سنوية',
    'yearly': 'باقة سنوية'
  };
  
  document.getElementById('selected-plan').textContent = planNames[selectedPlan] || 'لم يتم الاختيار';
  document.getElementById('selected-price').textContent = selectedPrice > 0 ? `$${selectedPrice}` : '$0';
  document.getElementById('total-price').textContent = selectedPrice > 0 ? `$${selectedPrice}` : '$0';
}

function enablePaymentButtons() {
  const paymentButtons = document.querySelectorAll('.payment-btn');
  paymentButtons.forEach(btn => {
    btn.disabled = selectedPrice === 0;
  });
}

function validateCustomerInfo() {
  const name = document.getElementById('customer-name').value.trim();
  const email = document.getElementById('customer-email').value.trim();
  
  if (!name) {
    showNotification('يرجى إدخال الاسم الكامل');
    return false;
  }
  
  if (!email) {
    showNotification('يرجى إدخال البريد الإلكتروني');
    return false;
  }
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification('يرجى إدخال بريد إلكتروني صحيح');
    return false;
  }
  
  return true;
}

function getCustomerData() {
  return {
    customer_name: document.getElementById('customer-name').value.trim(),
    customer_email: document.getElementById('customer-email').value.trim(),
    customer_phone: document.getElementById('customer-phone').value.trim(),
    plan_type: selectedPlan,
    amount: selectedPrice
  };
}

// PayPal Payment Processing with Backend Integration
async function processPayPalPayment() {
  if (!validateCustomerInfo()) return;
  
  const customerData = getCustomerData();
  customerData.payment_method = 'paypal';
  
  // Show loading state
  showNotification('جاري تحضير عملية الدفع...');
  
  try {
    const response = await fetch(`${backendUrl}/api/payment/create-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      showNotification('تم إنشاء رابط الدفع! سيتم فتح نافذة جديدة...');
      
      // Open PayPal payment URL
      setTimeout(() => {
        window.open(data.approval_url, '_blank');
        showNotification('تم فتح صفحة الدفع. يرجى إكمال عملية الدفع في النافذة الجديدة.');
        
        // Store transaction ID for later reference
        localStorage.setItem('rafalTransactionId', data.transaction_id);
      }, 1000);
    } else {
      showNotification(`خطأ في معالجة الدفع: ${data.error}`);
    }
  } catch (error) {
    console.error('PayPal payment error:', error);
    showNotification('حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
  }
}

// Stripe Payment Processing with Backend Integration
async function processStripePayment() {
  if (!validateCustomerInfo()) return;
  
  const customerData = getCustomerData();
  customerData.payment_method = 'stripe';
  
  showNotification('جاري تحضير عملية الدفع بالبطاقة...');
  
  try {
    const response = await fetch(`${backendUrl}/api/payment/create-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      // In a real implementation, you would use Stripe.js here
      showNotification('تم إنشاء طلب الدفع بنجاح! في التطبيق الحقيقي، سيتم فتح نموذج Stripe لإدخال بيانات البطاقة.');
      
      // Store transaction ID for later reference
      localStorage.setItem('rafalTransactionId', data.transaction_id);
      
      // Simulate successful payment after 3 seconds
      setTimeout(async () => {
        await updateTransactionStatus(data.transaction_id, 'completed', 'تم الدفع بنجاح عبر Stripe (محاكاة)');
        showNotification('تم الدفع بنجاح! سيتم تفعيل خدمتك قريباً.');
      }, 3000);
    } else {
      showNotification(`خطأ في معالجة الدفع: ${data.error}`);
    }
  } catch (error) {
    console.error('Stripe payment error:', error);
    showNotification('حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
  }
}

// Crypto Payment Processing with Backend Integration
async function processCryptoPayment() {
  if (!validateCustomerInfo()) return;
  
  const customerData = getCustomerData();
  customerData.payment_method = 'crypto';
  
  showNotification('جاري تحضير عملية الدفع بالعملات المشفرة...');
  
  try {
    const response = await fetch(`${backendUrl}/api/payment/create-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Display crypto payment details
      const cryptoDetails = `
        <div style="text-align: center; padding: 20px;">
          <h3>الدفع بالعملات المشفرة</h3>
          <p><strong>المبلغ بالدولار:</strong> $${data.amount_usd}</p>
          <p><strong>المبلغ بالبيتكوين:</strong> ${data.amount_btc} BTC</p>
          <p><strong>عنوان المحفظة:</strong></p>
          <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px;">${data.wallet_address}</p>
          <img src="${data.qr_code_url}" alt="QR Code" style="margin: 10px;">
          <p><small>امسح الكود أو انسخ عنوان المحفظة لإرسال الدفعة</small></p>
        </div>
      `;
      
      // Create modal to display crypto payment details
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); display: flex; align-items: center;
        justify-content: center; z-index: 10000;
      `;
      modal.innerHTML = `
        <div style="background: white; border-radius: 10px; max-width: 500px; width: 90%;">
          ${cryptoDetails}
          <button onclick="this.parentElement.parentElement.remove()" 
                  style="margin: 10px; padding: 10px 20px; background: #00796b; color: white; border: none; border-radius: 5px; cursor: pointer;">
            إغلاق
          </button>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Store transaction ID for later reference
      localStorage.setItem('rafalTransactionId', data.transaction_id);
      
      showNotification('تم إنشاء طلب الدفع بالعملات المشفرة. يرجى إرسال المبلغ المطلوب إلى العنوان المعروض.');
    } else {
      showNotification(`خطأ في معالجة الدفع: ${data.error}`);
    }
  } catch (error) {
    console.error('Crypto payment error:', error);
    showNotification('حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
  }
}

// Helper function to update transaction status
async function updateTransactionStatus(transactionId, status, notes) {
  try {
    const response = await fetch(`${backendUrl}/api/payment/transaction/${transactionId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, notes })
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error updating transaction status:', error);
    return false;
  }
}

// Function to check transaction status
async function checkTransactionStatus() {
  const transactionId = localStorage.getItem('rafalTransactionId');
  if (!transactionId) return;
  
  try {
    const response = await fetch(`${backendUrl}/api/payment/transaction/${transactionId}`);
    const data = await response.json();
    
    if (data.success) {
      const transaction = data.transaction;
      console.log('Transaction status:', transaction.status);
      
      if (transaction.status === 'completed') {
        showNotification('تم تأكيد الدفع بنجاح! مرحباً بك في RAFAL IPTV.');
        clearSavedFormData();
        localStorage.removeItem('rafalTransactionId');
      }
    }
  } catch (error) {
    console.error('Error checking transaction status:', error);
  }
}

// Enhanced form validation for payment form
function validatePaymentForm() {
  if (!selectedPlan || selectedPrice === 0) {
    showNotification('يرجى اختيار باقة الاشتراك أولاً');
    return false;
  }
  
  return validateCustomerInfo();
}

// Auto-save form data to localStorage
function saveFormData() {
  const formData = {
    name: document.getElementById('customer-name').value,
    email: document.getElementById('customer-email').value,
    phone: document.getElementById('customer-phone').value,
    selectedPlan: selectedPlan,
    selectedPrice: selectedPrice
  };
  
  localStorage.setItem('rafalPaymentForm', JSON.stringify(formData));
}

// Load saved form data
function loadFormData() {
  const savedData = localStorage.getItem('rafalPaymentForm');
  if (savedData) {
    try {
      const formData = JSON.parse(savedData);
      
      if (formData.name) document.getElementById('customer-name').value = formData.name;
      if (formData.email) document.getElementById('customer-email').value = formData.email;
      if (formData.phone) document.getElementById('customer-phone').value = formData.phone;
      
      if (formData.selectedPlan && formData.selectedPrice) {
        const planCard = document.querySelector(`[data-plan="${formData.selectedPlan}"]`);
        if (planCard) {
          selectPlan(planCard);
        }
      }
    } catch (e) {
      console.log('Could not load saved form data');
    }
  }
}

// Auto-save form data when user types
document.addEventListener('DOMContentLoaded', () => {
  loadFormData();
  
  const formInputs = document.querySelectorAll('#payment-form input, #payment-form select');
  formInputs.forEach(input => {
    input.addEventListener('input', saveFormData);
    input.addEventListener('change', saveFormData);
  });
  
  // Check transaction status periodically if there's a pending transaction
  const transactionId = localStorage.getItem('rafalTransactionId');
  if (transactionId) {
    checkTransactionStatus();
    // Check every 30 seconds
    setInterval(checkTransactionStatus, 30000);
  }
});

// Clear saved data after successful payment
function clearSavedFormData() {
  localStorage.removeItem('rafalPaymentForm');
}

// Function to test backend connectivity
async function testBackendConnection() {
  try {
    const response = await fetch(`${backendUrl}/api/payment/plans`);
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Backend connection successful');
      showNotification('تم الاتصال بالخادم بنجاح', 'success');
    } else {
      console.log('❌ Backend returned error:', data.error);
      showNotification('خطأ في الاتصال بالخادم', 'error');
    }
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    showNotification('فشل الاتصال بالخادم. يرجى التأكد من تشغيل الخادم الخلفي.', 'error');
  }
}

// Add a test button for backend connectivity (for development)
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const testButton = document.createElement('button');
    testButton.textContent = 'اختبار الاتصال بالخادم';
    testButton.style.cssText = `
      position: fixed; bottom: 20px; left: 20px; z-index: 1000;
      background: #00796b; color: white; border: none; padding: 10px;
      border-radius: 5px; cursor: pointer; font-size: 12px;
    `;
    testButton.onclick = testBackendConnection;
    document.body.appendChild(testButton);
  }
});

