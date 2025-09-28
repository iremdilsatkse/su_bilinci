// Water consumption calculator
const inputs = {
    shower: document.getElementById('shower'),
    dishes: document.getElementById('dishes'),
    teeth: document.getElementById('teeth'),
    toilet: document.getElementById('toilet'),
    cooking: document.getElementById('cooking')
};

const totalUsageEl = document.getElementById('totalUsage');
const yearlyUsageEl = document.getElementById('yearlyUsage');
const evaluationEl = document.getElementById('evaluation');
const savingsEl = document.getElementById('savings');
const clipRect = document.getElementById('clipRect');

function calculateWaterUsage() {
    if (!inputs.shower || !inputs.dishes || !inputs.teeth || !inputs.toilet || !inputs.cooking) return;
    if (!totalUsageEl || !yearlyUsageEl || !evaluationEl || !savingsEl || !clipRect) return;

    const usage = {
        shower: (parseInt(inputs.shower.value) || 0) * 10,
        dishes: (parseInt(inputs.dishes.value) || 0) * 6,
        teeth: (parseInt(inputs.teeth.value) || 0) * 2,
        toilet: (parseInt(inputs.toilet.value) || 0) * 6,
        cooking: (parseInt(inputs.cooking.value) || 0) * 3
    };

    const totalDaily = Object.values(usage).reduce((sum, value) => sum + value, 0);
    const yearlyUsage = totalDaily * 365;

    totalUsageEl.textContent = totalDaily;
    yearlyUsageEl.textContent = yearlyUsage.toLocaleString();

    let evaluation, color, savings;
    if (totalDaily < 100) {
        evaluation = 'Mükemmel! Su kullanımınız çok bilinçli.';
        color = '#10B981';
        savings = 0;
    } else if (totalDaily < 150) {
        evaluation = 'İyi! Biraz daha tasarruf edebilirsiniz.';
        color = '#F59E0B';
        savings = Math.max(0, totalDaily - 80);
    } else if (totalDaily < 200) {
        evaluation = 'Ortalama. Su tasarrufuna odaklanın.';
        color = '#EF4444';
        savings = Math.max(0, totalDaily - 80);
    } else {
        evaluation = 'Yüksek! Acilen tasarruf yapmalısınız.';
        color = '#DC2626';
        savings = Math.max(0, totalDaily - 80);
    }

    evaluationEl.textContent = evaluation;
    evaluationEl.style.color = color;
    savingsEl.textContent = Math.round(savings);

    const fillPercentage = Math.min(95, Math.max(5, (totalDaily / 300) * 100));
    const fillHeight = (fillPercentage / 100) * 250;
    const yPosition = 260 - fillHeight;

    clipRect.setAttribute('height', fillHeight);
    clipRect.setAttribute('y', yPosition);

    const droplet = document.getElementById('result-droplet');
    if (droplet) {
        droplet.style.transform = 'scale(1.05)';
        setTimeout(() => {
            droplet.style.transform = 'scale(1)';
        }, 200);
    }
}

Object.values(inputs).forEach(input => {
    if (input) {
        input.addEventListener('input', function() {
            let value = parseInt(this.value);
            const max = parseInt(this.getAttribute('max'));
            const min = parseInt(this.getAttribute('min'));

            if (value > max) {
                this.value = max;
            } else if (value < min) {
                this.value = min;
            }

            calculateWaterUsage();
        });

        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }
});

document.addEventListener('DOMContentLoaded', calculateWaterUsage);
if (document.readyState !== 'loading') calculateWaterUsage();

console.log('Su Bilinci Hesaplayıcı Yüklendi! 💧');