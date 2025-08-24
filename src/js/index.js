const offcanvas = document.getElementById("offcanvasMenu");
const overlay = document.getElementById("offcanvasOverlay");

// === Offcanvas Functions ===
function openOffcanvas() {
  offcanvas.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
}

function closeOffcanvas() {
  offcanvas.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
}

// === Modal Functions ===
function openModal(id) {
  // 1️⃣ Close offcanvas if it's open
  closeOffcanvas();

  // 2️⃣ Close any already open modal
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  // 3️⃣ Open requested modal
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function overlayClick(event, id) {
  if (event.target.id === id) {
    closeModal(id);
  }
}

// === Password Toggle (Reusable with Icons) ===
document.querySelectorAll(".toggle-password").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const input = toggle.previousElementSibling;
    if (input.type === "password") {
      input.type = "text";
      toggle.innerHTML = '<i class="ri-eye-off-line"></i>';
    } else {
      input.type = "password";
      toggle.innerHTML = '<i class="ri-eye-line"></i>';
    }
  });
});

(function () {
  const btn = document.getElementById("chatDropdownBtn");
  const content = document.getElementById("chatDropdownContent");

  btn.addEventListener("click", () => {
    content.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !content.contains(e.target)) {
      content.classList.add("hidden");
    }
  });
})();

// Profile dropdown toggle
document.querySelectorAll(".profile-dropdown").forEach((dropdown) => {
  const btn = dropdown.querySelector(".profile-btn");
  const content = dropdown.querySelector(".profile-content");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    content.classList.toggle("hidden");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      content.classList.add("hidden");
    }
  });
});

const btn = document.getElementById("dropdownBtn");
const content = document.getElementById("dropdownContent");
const icon = document.getElementById("dropdownIcon");

btn.addEventListener("click", () => {
  content.classList.toggle("hidden");
  icon.classList.toggle("rotate-180");
});

// Optional: close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!btn.contains(e.target) && !content.contains(e.target)) {
    content.classList.add("hidden");
    icon.classList.remove("rotate-180");
  }
});

//attachment preview

const attachBtn = document.getElementById("attachBtn");
const fileInput = document.getElementById("fileInput");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function showChat() {
  chatMessages.classList.remove("hidden");
}

function hideChatIfEmpty() {
  if (!chatMessages.hasChildNodes()) {
    chatMessages.classList.add("hidden");
  }
}

function addCloseButton(container) {
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = `<i class="ri-close-line text-accent-secondary hover:text-red-500"></i>`;
  closeBtn.className =
    "absolute -top-1 -right-1 w-4 h-4 flex justify-center items-center bg-white rounded-full shadow";
  closeBtn.onclick = () => {
    container.remove();
    hideChatIfEmpty();
  };
  return closeBtn;
}

function appendMessage(content, file = null) {
  showChat();

  const msgWrapper = document.createElement("div");
  msgWrapper.className = "relative w-fit max-w-[65%]";

  const msgDiv = document.createElement("div");
  msgDiv.className =
    "flex items-center gap-2 bg-accent-secondary/10 text-sm border border-minimal-white rounded-lg px-1 py-1 relative";

  if (file) {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.className = "w-16 h-16 object-cover rounded-md border";
        msgDiv.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else {
      let icon = "ri-file-2-line";
      if (file.type.includes("pdf")) icon = "ri-file-pdf-line";
      else if (file.type.includes("word")) icon = "ri-file-word-line";
      else if (file.type.includes("excel") || file.name.endsWith(".csv"))
        icon = "ri-file-excel-line";
      else if (file.type.includes("zip") || file.name.endsWith(".rar"))
        icon = "ri-file-zip-line";
      else if (file.type.includes("text")) icon = "ri-file-text-line";

      const iconEl = document.createElement("i");
      iconEl.className = `${icon} text-2xl text-blue-600`;

      const nameEl = document.createElement("span");
      nameEl.className = "text-sm font-medium truncate max-w-[100px]";
      nameEl.textContent = file.name;

      msgDiv.appendChild(iconEl);
      msgDiv.appendChild(nameEl);
    }
  } else if (content) {
    msgDiv.textContent = content;
  }

  msgWrapper.appendChild(msgDiv);
  msgWrapper.appendChild(addCloseButton(msgWrapper));

  chatMessages.appendChild(msgWrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

attachBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) appendMessage("", file);
});

sendBtn.addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (text) {
    appendMessage(text);
    chatInput.value = "";
  }
});

