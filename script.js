// Dua Database
const duas = {
    khairiyat: {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْخَيْرَ كُلَّهُ",
        urdu: "اے اللہ! میں تجھ سے ہر قسم کی بھلائی مانگتا ہوں",
        roman: "Allahumma inni as'aluka al-khayra kullahu"
    },
    sehat: {
        arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي",
        urdu: "اے اللہ! میرے جسم میں عافیت رکھ",
        roman: "Allahumma afini fi badani"
    },
    maafi: {
        arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ",
        urdu: "اے میرے رب! مجھے بخش دے اور میری توبہ قبول فرما",
        roman: "Rabbighfir li wa tub alayya"
    },
    rizq: {
        arabic: "اللَّهُمَّ ارْزُقْنِي رِزْقًا حَلَالًا وَاسِعًا",
        urdu: "اے اللہ! مجھے حلال اور وسیع رزق عطا فرما",
        roman: "Allahumma arzuqni rizqan halalan wasi'a"
    },
    hidayat: {
        arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
        urdu: "اے اللہ! مجھے ہدایت عطا فرما اور میری رہنمائی فرما",
        roman: "Allahumma ahdini wa saddidni"
    }
};

// DOM Elements
const userNameInput = document.getElementById('userName');
const duaTypeSelect = document.getElementById('duaType');
const duaTextElement = document.getElementById('duaText');
const languageButtons = document.querySelectorAll('.language-toggle button');
const whatsappShareBtn = document.getElementById('whatsappShare');
const copyLinkBtn = document.getElementById('copyLink');
const bgMusic = document.getElementById('bgMusic');

// Current State
let currentLanguage = 'arabic';
let currentDuaType = '';
let ameenCount = 0;

// Initialize Stars Animation
function initStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random properties
        const size = Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--duration', `${duration}s`);
        
        starsContainer.appendChild(star);
    }
}

// Update Dua Display
function updateDuaDisplay() {
    const name = userNameInput.value.trim() || 'Aap';
    const duaType = duaTypeSelect.value;
    
    if (!duaType) {
        duaTextElement.textContent = 'براہ کرم ایک دعا منتخب کریں';
        return;
    }
    
    currentDuaType = duaType;
    const dua = duas[duaType][currentLanguage];
    
    // Format the dua with the user's name
    let formattedDua = dua;
    if (currentLanguage === 'urdu' || currentLanguage === 'roman') {
        formattedDua = `${name} کے لیے: ${dua}`;
    } else {
        formattedDua = `للـ${name}: ${dua}`;
    }
    
    duaTextElement.textContent = formattedDua;
}

// Generate Shareable Link
function generateShareLink() {
    const name = encodeURIComponent(userNameInput.value.trim());
    const duaType = duaTypeSelect.value;
    
    if (!name || !duaType) return window.location.href;
    
    return `${window.location.origin}${window.location.pathname}?name=${name}&dua=${duaType}`;
}

// Initialize Event Listeners
function initEventListeners() {
    // Language toggle
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentLanguage = button.dataset.lang;
            updateDuaDisplay();
        });
    });
    
    // Input changes
    userNameInput.addEventListener('input', updateDuaDisplay);
    duaTypeSelect.addEventListener('change', updateDuaDisplay);
    
    // Share buttons
    whatsappShareBtn.addEventListener('click', () => {
        const link = generateShareLink();
        const message = `🤲 یہ دعا آپ کے لیے ہے:\n\n${duaTextElement.textContent}\n\n${link}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    });
    
    copyLinkBtn.addEventListener('click', () => {
        const link = generateShareLink();
        navigator.clipboard.writeText(link).then(() => {
            alert('Ameen kehna na bhoolna 💖\n\nLink copied to clipboard!');
            ameenCount++;
        });
    });
    
    // Background music toggle
    document.addEventListener('click', () => {
        // First interaction will unmute the audio
        if (bgMusic.muted) {
            bgMusic.muted = false;
            bgMusic.play().catch(e => console.log('Audio play failed:', e));
        }
    });
}

// Initialize the app
function init() {
    initStars();
    initEventListeners();
    
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('name');
    const duaParam = urlParams.get('dua');
    
    if (nameParam) userNameInput.value = decodeURIComponent(nameParam);
    if (duaParam && duas[duaParam]) {
        duaTypeSelect.value = duaParam;
        updateDuaDisplay();
    }
    
    // Start muted background music
    bgMusic.muted = true;
    bgMusic.play().catch(e => console.log('Autoplay prevented:', e));
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
