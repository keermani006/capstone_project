document.addEventListener("DOMContentLoaded", () => {
    // Cart functionality
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    updateCartCount()
    updateCartDropdown()
  
    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".book__now")
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const name = this.getAttribute("data-name")
        const price = Number.parseFloat(this.getAttribute("data-price"))
        const item = {
          id: Date.now().toString(),
          name: name,
          price: price,
          quantity: 1,
          image: "eric-marty-IZunjrb3soo-unsplash.jpg", // Default image
        }
  
        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex((cartItem) => cartItem.name === name)
  
        if (existingItemIndex > -1) {
          // Increase quantity if item already exists
          cart[existingItemIndex].quantity += 1
        } else {
          // Add new item to cart
          cart.push(item)
        }
  
        // Save cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart))
  
        // Update cart UI
        updateCartCount()
        updateCartDropdown()
  
        // Show notification
        showNotification(`${name} added to cart!`)
      })
    })
  
    // Function to update cart count
    function updateCartCount() {
      const cartCount = document.querySelector(".cart-count")
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
      cartCount.textContent = totalItems
    }
  
    // Function to update cart dropdown
    function updateCartDropdown() {
      const cartItems = document.querySelector(".cart-items")
      const cartTotal = document.querySelector(".cart-total span")
  
      // Clear current items
      cartItems.innerHTML = ""
  
      if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>'
        cartTotal.textContent = "$0"
        return
      }
  
      // Calculate total
      let total = 0
  
      // Add each item to the dropdown
      cart.forEach((item) => {
        const itemTotal = item.price * item.quantity
        total += itemTotal
  
        const cartItemHTML = `
          <div class="cart-item" data-id="${item.id}">
            
            <div class="cart-item-details">
              <p class="cart-item-name">${item.name}</p>
              <p class="cart-item-price">$${item.price} x ${item.quantity}</p>
            </div>
            <i class="ri-delete-bin-line cart-item-remove"></i>
          </div>
        `
  
        cartItems.innerHTML += cartItemHTML
      })
  
      // Update total
      cartTotal.textContent = `$${total.toFixed(2)}`
  
      // Add event listeners to remove buttons
      const removeButtons = document.querySelectorAll(".cart-item-remove")
      removeButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const cartItem = this.closest(".cart-item")
          const itemId = cartItem.getAttribute("data-id")
  
          // Remove item from cart
          cart = cart.filter((item) => item.id !== itemId)
  
          // Save updated cart
          localStorage.setItem("cart", JSON.stringify(cart))
  
          // Update UI
          updateCartCount()
          updateCartDropdown()
        })
      })
    }
  
    // Function to show notification
    function showNotification(message) {
      // Create notification element
      const notification = document.createElement("div")
      notification.className = "notification"
      notification.textContent = message
  
      // Add styles
      notification.style.position = "fixed"
      notification.style.bottom = "20px"
      notification.style.right = "20px"
      notification.style.backgroundColor = "var(--primary-color)"
      notification.style.color = "white"
      notification.style.padding = "10px 20px"
      notification.style.borderRadius = "5px"
      notification.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.2)"
      notification.style.zIndex = "1000"
      notification.style.opacity = "0"
      notification.style.transform = "translateY(20px)"
      notification.style.transition = "opacity 0.3s, transform 0.3s"
  
      // Add to body
      document.body.appendChild(notification)
  
      // Trigger animation
      setTimeout(() => {
        notification.style.opacity = "1"
        notification.style.transform = "translateY(0)"
      }, 10)
  
      // Remove after 3 seconds
      setTimeout(() => {
        notification.style.opacity = "0"
        notification.style.transform = "translateY(20px)"
  
        // Remove from DOM after animation
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 300)
      }, 3000)
    }
  
    // Checkout button functionality
    const checkoutBtn = document.querySelector(".checkout-btn")
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (cart.length > 0) {
          window.location.href = "checkout.html"
        } else {
          showNotification("Your cart is empty!")
        }
      })
    }
  
    // Scroll animation
    const animateElements = document.querySelectorAll(".animate-on-scroll")
  
    function checkScroll() {
      animateElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.2
  
        if (elementPosition < screenPosition) {
          element.classList.add("animate")
        }
      })
    }
  
    
    checkScroll()
  
    
    window.addEventListener("scroll", checkScroll)
  })
  
  