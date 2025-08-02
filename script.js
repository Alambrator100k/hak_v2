// عرض تنبيه الاستخدام عند تحميل الصفحة
window.onload = function() {
    document.getElementById('disclaimerModal').style.display = 'flex';
    startMatrixEffect();
    typeInitialTerminalLines();
};

// إغلاق النافذة المنبثقة
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// تأثير المصفوفة
function startMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrixCanvas';
    document.getElementById('matrixEffect').appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    const alphabet = katakana + latin + nums + symbols;
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = [];
    
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    
    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    
    setInterval(draw, 30);
}

// كتابة الأسطر الأولية في المحاكاة الطرفية
function typeInitialTerminalLines() {
    const lines = [
        { text: "فحص أمن النظام...", delay: 100 },
        { text: "التحقق من الثغرات...", delay: 200 },
        { text: "تحميل قاعدة بيانات الأهداف...", delay: 300 },
        { text: "الاتصال بالخوادم السرية...", delay: 400 },
        { text: "تهيئة أدوات الاختراق...", delay: 500 },
        { text: "النظام جاهز للاستخدام", delay: 600, class: "success" }
    ];
    
    const terminalOutput = document.getElementById('terminalOutput');
    
    lines.forEach((line, index) => {
        setTimeout(() => {
            const lineElement = document.createElement('div');
            lineElement.className = `terminal-line ${line.class || ''}`;
            lineElement.innerHTML = `<span class="prompt">root@h4ck3r:~$</span> ${line.text}`;
            terminalOutput.appendChild(lineElement);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, line.delay);
    });
}

// معالجة الأوامر
document.getElementById('terminalInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const command = this.value.trim();
        this.value = '';
        
        if (command) {
            processCommand(command);
        }
    }
});

function runCommand(command) {
    document.getElementById('terminalInput').value = command;
    processCommand(command);
}

function processCommand(command) {
    const terminalOutput = document.getElementById('terminalOutput');
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = `<span class="prompt">root@h4ck3r:~$</span> ${command}`;
    terminalOutput.appendChild(promptLine);
    
    // معالجة الأوامر
    let response = '';
    let responseClass = '';
    
    if (command === 'help' || command === 'مساعدة') {
        response = `الأوامر المتاحة:
        - scan ip [عنوان]: مسح عنوان IP
        - track phone [رقم]: تتبع رقم هاتف
        - ddos start [رابط]: بدء هجوم DDoS
        - decrypt files: فك تشفير الملفات
        - bruteforce: اختراق كلمات السر
        - social scan [اسم مستخدم]: مسح وسائل التواصل
        - clear: مسح الشاشة
        - help: عرض هذه المساعدة`;
    } 
    else if (command.startsWith('scan ip')) {
        const ip = command.split(' ')[2] || '192.168.1.1';
        response = `جاري مسح العنوان ${ip}...
        [✓] تم اكتشاف الثغرات: 3
        [✓] نقاط الدخول المحتملة: 2
        [✓] أنظمة التشغيل المكتشفة: Linux, Windows
        [✓] الوقت المستغرق: 2.4 ثانية`;
        responseClass = 'success';
    }
    else if (command.startsWith('track phone')) {
        const phone = command.split(' ')[2] || '+20123456789';
        response = `جاري تتبع الرقم ${phone}...
        [✓] الموقع: القاهرة، مصر
        [✓] المشغل: فودافون
        [✓] جهة الاتصال: محمد أحمد
        [✓] آخر موقع معروف: 30.0444° N, 31.2357° E`;
        responseClass = 'success';
    }
    else if (command.startsWith('ddos start')) {
        const url = command.split(' ')[2] || 'example.com';
        response = `بدء هجوم DDoS على ${url}...
        [✓] تم إرسال 1245 طلب في الثانية
        [✓] استجابة الخادم: 503 Service Unavailable
        [✓] الوقت المستغرق: 5.7 ثانية
        [!] تحذير: هذا الهجوم قد يكون غير قانوني في بعض الدول`;
        responseClass = 'warning';
        
        // محاكاة الهجوم
        simulateDDoS();
    }
    else if (command === 'decrypt files') {
        response = `جاري فك تشفير الملفات...
        [✓] تم فك تشفير 14 ملف
        [✓] الملفات المتاحة الآن في /downloads/decrypted
        [!] تحذير: بعض الملفات قد تكون محمية بحقوق الملكية`;
        responseClass = 'success';
    }
    else if (command === 'bruteforce') {
        response = `بدء هجوم القوة الغاشمة...
        [✓] اختبار 245 كلمة سر في الثانية
        [✓] كلمة السر المكتشفة: 'password123'
        [✓] الوقت المستغرق: 12.3 ثانية
        [!] تحذير: هذا الهجوم غير قانوني بدون إذن`;
        responseClass = 'warning';
    }
    else if (command.startsWith('social scan')) {
        const username = command.split(' ')[2] || 'johndoe';
        response = `جاري مسح وسائل التواصل لـ ${username}...
        [✓] Facebook: https://facebook.com/${username}
        [✓] Twitter: https://twitter.com/${username}
        [✓] Instagram: https://instagram.com/${username}
        [✗] LinkedIn: غير موجود
        [✓] تم جمع 14 صورة و 32 منشور`;
        responseClass = 'success';
    }
    else if (command === 'clear') {
        terminalOutput.innerHTML = '';
        return;
    }
    else {
        response = `خطأ: الأمر '${command}' غير معروف. اكتب 'help' لرؤية الأوامر المتاحة`;
        responseClass = 'error';
    }
    
    if (response) {
        const responseLines = response.split('\n');
        responseLines.forEach((line, index) => {
            setTimeout(() => {
                const lineElement = document.createElement('div');
                lineElement.className = `terminal-line ${responseClass}`;
                lineElement.textContent = line.trim();
                terminalOutput.appendChild(lineElement);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }, index * 100);
        });
    }
}

// محاكاة هجوم DDoS
function simulateDDoS() {
    const stats = {
        requests: 0,
        success: 0,
        failed: 0
    };
    
    const interval = setInterval(() => {
        stats.requests += Math.floor(Math.random() * 100) + 50;
        stats.success += Math.floor(Math.random() * 80) + 40;
        stats.failed = stats.requests - stats.success;
        
        const terminalOutput = document.getElementById('terminalOutput');
        const statusLine = document.createElement('div');
        statusLine.className = 'terminal-line info';
        statusLine.textContent = `[DDoS] الطلبات: ${stats.requests} | الناجحة: ${stats.success} | الفاشلة: ${stats.failed}`;
        
        // الاحتفاظ بعدد محدود من الأسطر
        if (terminalOutput.children.length > 50) {
            terminalOutput.removeChild(terminalOutput.children[0]);
        }
        
        terminalOutput.appendChild(statusLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }, 1000);
    
    // إيقاف المحاكاة بعد 10 ثواني
    setTimeout(() => {
        clearInterval(interval);
        const terminalOutput = document.getElementById('terminalOutput');
        const endLine = document.createElement('div');
        endLine.className = 'terminal-line success';
        endLine.textContent = '[DDoS] تم إيقاف الهجوم تلقائياً بعد 10 ثواني';
        terminalOutput.appendChild(endLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }, 10000);
}

// إعادة حجم تأثير المصفوفة عند تغيير حجم النافذة
window.onresize = function() {
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
};