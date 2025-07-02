// Dua Database
const duas = {
    dua1: {
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        urdu: "Aye hamare Rab! Humein duniya mein bhalai ata farma aur akhirat mein bhi bhalai ata farma aur humein aag ke azab se bacha."
    },
    dua2: {
        arabic: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ، أَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا",
        urdu: "Aye Allah! Logon ke Rab, takleef ko door kar de, shifa de de, tu hi shifa dene wala hai, tere siwa koi shifa dene wala nahi, aisi shifa de ke koi bimari baqi na rahe."
    },
    dua3: {
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        urdu: "Aye Allah! Mujhe apne halal rizq se haram se bacha le aur apne fazl se dusron se beparwah kar de."
    },
    dua4: {
        arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ",
        urdu: "Aye mere Rab! Mujhe salih logon mein se nikah ata farma."
    },
    dua5: {
        arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        urdu: "Tere siwa koi mabood nahi, tu paak hai, main sacchi muchchi apni ghalti maanta hoon."
    }
};

// Form Submission
document.getElementById('duaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateLink();
});

// Generate Shareable Link
function generateLink() {
    const name = document.getElementById('nameInput').value.trim();
    const duaId = document.getElementById('duaSelect').value;
    
    if(!name) {
        alert("Kripya apna naam likhein");
        return;
    }
    
    // Show animation
    const animation = document.getElementById('duaAnimation');
    animation.classList.remove('hidden');
    animation.querySelector('.arabic').textContent = duas[duaId].arabic;
    animation.querySelector('.urdu').textContent = duas[duaId].urdu;
    
    // Generate link (fake URL for demo)
    const link = `https://muhram-dua-share.vercel.app/dua.html?name=${encodeURIComponent(name)}&dua=${duaId}`;
    
    // Show link section
    const linkSection = document.getElementById('linkSection');
    linkSection.classList.remove('hidden');
    document.getElementById('generatedLink').value = link;
    
    // Scroll to result
    linkSection.scrollIntoView({ behavior: 'smooth' });
}

// Copy Link to Clipboard
function copyLink() {
    const linkInput = document.getElementById('generatedLink');
    linkInput.select();
    document.execCommand('copy');
    alert("Link copy ho gaya! Ab aap paste kar sakte hain.");
}

// Share Functions
function shareOnWhatsApp() {
    const link = document.getElementById('generatedLink').value;
    window.open(`https://wa.me/?text=${encodeURIComponent("Meri dua aapke liye: " + link)}`, '_blank');
}

function shareOnFacebook() {
    const link = document.getElementById('generatedLink').value;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, '_blank');
}

// Donation Function
function donate() {
    alert("Shukriya! Aapka donation hamare madrassa ke gareeb bachon ki taleem mein madad karega.");
    // Yahan aap donation gateway ka link add kar sakte hain
}
