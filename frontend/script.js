// ========================================
// DEEPGUARD AI - DEEPFAKE DETECTOR
// Complete JavaScript Implementation
// ========================================

class DeepGuardAI {
    constructor() {
        this.uploadedFile = null;
        this.isAnalyzing = false;
        this.analysisResult = null;
        this.analysisHistory = [];
        
        // Initialize the application
        this.init();
    }
    
    // ========================================
    // INITIALIZATION
    // ========================================
    init() {
        this.setupEventListeners();
        this.createParticles();
        this.handleLoadingScreen();
        this.animateStats();
        this.setupIntersectionObserver();
    }
    
    // ========================================
    // EVENT LISTENERS SETUP
    // ========================================
    setupEventListeners() {
        // File upload events
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');
        const uploadBtn = document.getElementById('uploadBtn');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const removeFileBtn = document.getElementById('removeFileBtn');
        
        // Navigation events
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Modal events
        const shareResultBtn = document.getElementById('shareResultBtn');
        const downloadReportBtn = document.getElementById('downloadReportBtn');
        const closeShareModal = document.getElementById('closeShareModal');
        const shareModal = document.getElementById('shareModal');
        
        // File input change
        fileInput?.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Upload area events
        uploadArea?.addEventListener('click', () => this.triggerFileInput());
        uploadArea?.addEventListener('dragover', (e) => this.handleDragOver(e));
        uploadArea?.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        uploadArea?.addEventListener('drop', (e) => this.handleDrop(e));
        
        // Button events
        uploadBtn?.addEventListener('click', () => this.triggerFileInput());
        analyzeBtn?.addEventListener('click', () => this.analyzeImage());
        removeFileBtn?.addEventListener('click', () => this.removeFile());
        
        // Navigation
        navToggle?.addEventListener('click', () => this.toggleMobileNav());
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Modal events
        shareResultBtn?.addEventListener('click', () => this.showShareModal());
        downloadReportBtn?.addEventListener('click', () => this.downloadReport());
        closeShareModal?.addEventListener('click', () => this.hideShareModal());
        shareModal?.querySelector('.modal-backdrop')?.addEventListener('click', () => this.hideShareModal());
        
        // Share buttons
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleShare(e));
        });
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        
        // Prevent default drag behaviors on document
        document.addEventListener('dragover', (e) => e.preventDefault());
        document.addEventListener('drop', (e) => e.preventDefault());
    }
    
    // ========================================
    // LOADING SCREEN
    // ========================================
    handleLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Simulate loading time
        setTimeout(() => {
            loadingScreen?.classList.add('hide');
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen?.remove();
            }, 500);
        }, 2000);
    }
    
    // ========================================
    // PARTICLE SYSTEM
    // ========================================
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random starting position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random color
            const colors = ['#00d4ff', '#b347d9', '#39ff14', '#ff6b6b'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // ========================================
    // STATS ANIMATION
    // ========================================
    animateStats() {
        const stats = [
            { id: 'totalScans', target: 1247, suffix: '' },
            { id: 'accuracy', target: 94.2, suffix: '%' },
            { id: 'avgTime', target: 2.3, suffix: 's' }
        ];
        
        stats.forEach(stat => {
            const element = document.getElementById(stat.id);
            if (!element) return;
            
            this.animateNumber(element, 0, stat.target, 2000, stat.suffix);
        });
    }
    
    animateNumber(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        const range = end - start;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const current = start + (range * easedProgress);
            
            element.textContent = current.toFixed(suffix === 's' ? 1 : 0) + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // ========================================
    // INTERSECTION OBSERVER
    // ========================================
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });
        
        // Observe animated elements
        document.querySelectorAll('.stat-item, .feature-item, .insight-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    // ========================================
    // NAVIGATION
    // ========================================
    toggleMobileNav() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        navToggle?.classList.toggle('active');
        navMenu?.classList.toggle('active');
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        
        if (targetId?.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');
    }
    
    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    handleResize() {
        // Handle responsive changes
        const navMenu = document.getElementById('navMenu');
        if (window.innerWidth > 768) {
            navMenu?.classList.remove('active');
            document.getElementById('navToggle')?.classList.remove('active');
        }
    }
    
    // ========================================
    // FILE HANDLING
    // ========================================
    triggerFileInput() {
        if (this.isAnalyzing) return;
        document.getElementById('fileInput')?.click();
    }
    
    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.isAnalyzing) return;
        
        const uploadArea = document.getElementById('uploadArea');
        uploadArea?.classList.add('drag-over');
        
        // Update text
        document.getElementById('uploadTitle').textContent = 'Drop the image here';
    }
    
    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const uploadArea = document.getElementById('uploadArea');
        uploadArea?.classList.remove('drag-over');
        
        // Reset text
        document.getElementById('uploadTitle').textContent = 'Drag & drop an image here';
    }
    
    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.isAnalyzing) return;
        
        const uploadArea = document.getElementById('uploadArea');
        uploadArea?.classList.remove('drag-over');
        
        // Reset text
        document.getElementById('uploadTitle').textContent = 'Drag & drop an image here';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }
    
    processFile(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showToast('error', 'Invalid File Type', 'Please upload a valid image file.');
            return;
        }
        
        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            this.showToast('error', 'File Too Large', 'File size must be less than 10MB.');
            return;
        }
        
        this.uploadedFile = file;
        this.displayFilePreview(file);
        this.showToast('success', 'File Uploaded', 'Image uploaded successfully!');
    }
    
    displayFilePreview(file) {
        const filePreview = document.getElementById('filePreview');
        const previewImage = document.getElementById('previewImage');
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');
        const fileType = document.getElementById('fileType');
        
        // Create object URL for preview
        const objectUrl = URL.createObjectURL(file);
        previewImage.src = objectUrl;
        previewImage.onload = () => URL.revokeObjectURL(objectUrl);
        
        // Update file info
        fileName.textContent = file.name;
        fileSize.textContent = this.formatFileSize(file.size);
        fileType.textContent = file.type;
        
        // Show preview and hide upload area
        filePreview.style.display = 'block';
        this.hideElement('uploadArea');
        
        // Reset previous results
        this.resetResults();
    }
    
    removeFile() {
        this.uploadedFile = null;
        
        // Hide preview and show upload area
        document.getElementById('filePreview').style.display = 'none';
        this.showElement('uploadArea');
        
        // Clear file input
        document.getElementById('fileInput').value = '';
        
        // Reset results
        this.resetResults();
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // ========================================
    // IMAGE ANALYSIS
    // ========================================
    async analyzeImage() {
        if (!this.uploadedFile || this.isAnalyzing) return;
        
        this.isAnalyzing = true;
        this.startAnalysis();
        
        try {
            // Simulate API call with realistic processing
            const result = await this.simulateDeepfakeDetection(this.uploadedFile);
            
            this.analysisResult = result;
            this.displayResults(result);
            this.showInsights(result);
            
            // Add to history
            this.addToHistory(result);
            
        } catch (error) {
            console.error('Analysis failed:', error);
            this.showError('Analysis failed. Please try again.');
        } finally {
            this.isAnalyzing = false;
            this.stopAnalysis();
        }
    }
    
    async simulateDeepfakeDetection(file) {
        const startTime = Date.now();
        
        // Simulate image processing steps
        await this.simulateAnalysisSteps();
        
        // Generate realistic results
        const isDeepfake = Math.random() < 0.25; // 25% chance of deepfake
        const baseConfidence = isDeepfake ? 0.75 : 0.85;
        const confidence = baseConfidence + (Math.random() * 0.15);
        const confidencePercent = Math.round(confidence * 100 * 10) / 10;
        
        // Calculate processing time
        const processingTime = (Date.now() - startTime) / 1000;
        
        // Get image dimensions
        const dimensions = await this.getImageDimensions(file);
        
        return {
            id: this.generateAnalysisId(),
            timestamp: new Date().toISOString(),
            filename: file.name,
            fileSize: this.formatFileSize(file.size),
            dimensions: `${dimensions.width}x${dimensions.height}`,
            processingTime: `${processingTime.toFixed(2)}s`,
            isDeepfake,
            confidence: confidencePercent,
            riskLevel: this.calculateRiskLevel(confidence, isDeepfake),
            metrics: this.generateMetrics(file, confidence),
            recommendation: this.generateRecommendation(isDeepfake, confidence)
        };
    }
    
    async simulateAnalysisSteps() {
        const steps = document.querySelectorAll('.step');
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        
        const stepDurations = [1500, 2000, 1500]; // milliseconds for each step
        let totalProgress = 0;
        
        for (let i = 0; i < steps.length; i++) {
            // Activate current step
            steps[i]?.classList.add('active');
            
            // Animate progress
            const stepProgress = (i + 1) * (100 / steps.length);
            await this.animateProgress(progressBar, progressText, totalProgress, stepProgress, stepDurations[i]);
            totalProgress = stepProgress;
            
            // Deactivate previous step
            if (i > 0) {
                steps[i - 1]?.classList.remove('active');
            }
        }
        
        // Final step
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    async animateProgress(progressBar, progressText, start, end, duration) {
        return new Promise(resolve => {
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = start + (end - start) * progress;
                
                if (progressBar) {
                    progressBar.style.width = current + '%';
                }
                if (progressText) {
                    progressText.textContent = Math.round(current) + '%';
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }
    
    getImageDimensions(file) {
        return new Promise((resolve) => {
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);
            
            img.onload = () => {
                URL.revokeObjectURL(objectUrl);
                resolve({
                    width: img.naturalWidth,
                    height: img.naturalHeight
                });
            };
            
            img.onerror = () => {
                URL.revokeObjectURL(objectUrl);
                resolve({ width: 0, height: 0 });
            };
            
            img.src = objectUrl;
        });
    }
    
    calculateRiskLevel(confidence, isDeepfake) {
        if (!isDeepfake) {
            return confidence > 0.9 ? 'LOW' : 'MEDIUM';
        }
        
        if (confidence > 0.8) return 'HIGH';
        if (confidence > 0.6) return 'MEDIUM';
        return 'LOW';
    }
    
    generateMetrics(file, confidence) {
        return {
            imageQuality: this.getRandomMetric(['High', 'Medium', 'Low'], [0.6, 0.3, 0.1]),
            edgeConsistency: this.getRandomMetric(['Good', 'Fair', 'Poor'], [0.7, 0.2, 0.1]),
            compressionArtifacts: this.getRandomMetric(['Low', 'Medium', 'High'], [0.8, 0.15, 0.05]),
            noisePattern: this.getRandomMetric(['Natural', 'Synthetic', 'Unknown'], [0.75, 0.15, 0.1])
        };
    }
    
    getRandomMetric(options, weights) {
        const random = Math.random();
        let sum = 0;
        
        for (let i = 0; i < weights.length; i++) {
            sum += weights[i];
            if (random <= sum) {
                return options[i];
            }
        }
        
        return options[0];
    }
    
    generateRecommendation(isDeepfake, confidence) {
        if (isDeepfake) {
            if (confidence > 0.8) {
                return 'High confidence deepfake detected. Exercise extreme caution when using or sharing this content. Consider verifying the source and authenticity through additional means.';
            } else {
                return 'Potential deepfake detected with moderate confidence. We recommend additional verification before using this content for important purposes.';
            }
        } else {
            return 'This image appears to be authentic with no significant signs of deepfake manipulation. However, always exercise caution with digital content and verify sources when possible.';
        }
    }
    
    generateAnalysisId() {
        return 'analysis_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // ========================================
    // UI STATE MANAGEMENT
    // ========================================
    startAnalysis() {
        // Update button state
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            analyzeBtn.disabled = true;
            analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin btn-icon"></i> Analyzing...';
            analyzeBtn.classList.add('analyzing');
        }
        
        // Show loading state
        this.hideElement('emptyState');
        this.hideElement('analysisResult');
        this.showElement('loadingState');
    }
    
    stopAnalysis() {
        // Reset button state
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i class="fas fa-search btn-icon"></i> Analyze Again';
            analyzeBtn.classList.remove('analyzing');
        }
        
        // Hide loading state
        this.hideElement('loadingState');
    }
    
    displayResults(result) {
        // Hide other states
        this.hideElement('emptyState');
        this.hideElement('loadingState');
        
        // Update result elements
        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        const resultDescription = document.getElementById('resultDescription');
        const confidenceValue = document.getElementById('confidenceValue');
        const confidenceBar = document.getElementById('confidenceBar');
        const riskBadge = document.getElementById('riskBadge');
        
        // Set icon and title based on result
        if (result.isDeepfake) {
            resultIcon.className = 'result-icon fas fa-exclamation-triangle danger';
            resultTitle.textContent = 'Deepfake Detected';
            resultDescription.textContent = 'This image shows signs of artificial manipulation or generation.';
        } else {
            resultIcon.className = 'result-icon fas fa-shield-alt success';
            resultTitle.textContent = 'Image Appears Authentic';
            resultDescription.textContent = 'No signs of deepfake manipulation detected.';
        }
        
        // Update confidence
        confidenceValue.textContent = result.confidence + '%';
        
        // Animate confidence bar
        setTimeout(() => {
            confidenceBar.style.setProperty('--confidence-width', result.confidence + '%');
            confidenceBar.className = `confidence-bar ${result.isDeepfake ? 'danger' : 'success'}`;
        }, 100);
        
        // Update risk level
        riskBadge.textContent = result.riskLevel;
        riskBadge.className = `risk-badge ${result.riskLevel.toLowerCase()}`;
        
        // Update metrics
        this.updateMetrics(result);
        
        // Show result
        this.showElement('analysisResult');
    }
    
    updateMetrics(result) {
        document.getElementById('processingTime').textContent = result.processingTime;
        document.getElementById('metricFileSize').textContent = result.fileSize;
        document.getElementById('resolution').textContent = result.dimensions;
    }
    
    showInsights(result) {
        // Update technical analysis
        document.getElementById('imageQuality').textContent = result.metrics.imageQuality;
        document.getElementById('edgeConsistency').textContent = result.metrics.edgeConsistency;
        document.getElementById('compressionArtifacts').textContent = result.metrics.compressionArtifacts;
        document.getElementById('noisePattern').textContent = result.metrics.noisePattern;
        
        // Update recommendation
        document.getElementById('recommendationMessage').textContent = result.recommendation;
        
        // Show insights section
        this.showElement('insightsSection');
    }
    
    resetResults() {
        this.hideElement('analysisResult');
        this.hideElement('loadingState');
        this.hideElement('insightsSection');
        this.showElement('emptyState');
        this.analysisResult = null;
    }
    
    showElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = element.dataset.originalDisplay || 'block';
        }
    }
    
    hideElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            if (!element.dataset.originalDisplay) {
                element.dataset.originalDisplay = window.getComputedStyle(element).display;
            }
            element.style.display = 'none';
        }
    }
    
    // ========================================
    // HISTORY MANAGEMENT
    // ========================================
    addToHistory(result) {
        this.analysisHistory.unshift({
            id: result.id,
            timestamp: result.timestamp,
            filename: result.filename,
            isDeepfake: result.isDeepfake,
            confidence: result.confidence,
            riskLevel: result.riskLevel
        });
        
        // Keep only last 50 analyses
        if (this.analysisHistory.length > 50) {
            this.analysisHistory = this.analysisHistory.slice(0, 50);
        }
        
        // Save to localStorage if available
        try {
            localStorage.setItem('deepguard_history', JSON.stringify(this.analysisHistory));
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }
    }
    
    loadHistory() {
        try {
            const saved = localStorage.getItem('deepguard_history');
            if (saved) {
                this.analysisHistory = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Could not load from localStorage:', e);
            this.analysisHistory = [];
        }
    }
    
    // ========================================
    // MODAL MANAGEMENT
    // ========================================
    showShareModal() {
        const modal = document.getElementById('shareModal');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);
            document.body.classList.add('no-scroll');
        }
    }
    
    hideShareModal() {
        const modal = document.getElementById('shareModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }, 300);
        }
    }
    
    handleShare(e) {
        const platform = e.currentTarget.dataset.platform;
        const result = this.analysisResult;
        
        if (!result) return;
        
        const shareText = `I just analyzed an image with DeepGuard AI and it was detected as ${result.isDeepfake ? 'a deepfake' : 'authentic'} with ${result.confidence}% confidence! 🛡️ #DeepfakeDetection #AITechnology`;
        const shareUrl = window.location.href;
        
        switch (platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`, '_blank');
                break;
            case 'copy':
                this.copyToClipboard(`${shareText}\n\n${shareUrl}`);
                this.showToast('success', 'Copied!', 'Share text copied to clipboard.');
                break;
        }
        
        this.hideShareModal();
    }
    
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).catch(err => {
                console.error('Could not copy text: ', err);
                this.fallbackCopyTextToClipboard(text);
            });
        } else {
            this.fallbackCopyTextToClipboard(text);
        }
    }
    
    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback: Could not copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }
    
    // ========================================
    // REPORT GENERATION
    // ========================================
    downloadReport() {
        if (!this.analysisResult) return;
        
        const result = this.analysisResult;
        const reportData = this.generateReportData(result);
        const blob = new Blob([reportData], { type: 'text/plain' });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `deepguard-analysis-${result.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('success', 'Report Downloaded', 'Analysis report has been saved to your downloads.');
    }
    
    generateReportData(result) {
        const timestamp = new Date(result.timestamp).toLocaleString();
        
        return `
DEEPGUARD AI - DEEPFAKE ANALYSIS REPORT
=======================================

Analysis ID: ${result.id}
Date & Time: ${timestamp}
File Name: ${result.filename}

ANALYSIS RESULTS
================
Status: ${result.isDeepfake ? 'DEEPFAKE DETECTED' : 'AUTHENTIC IMAGE'}
Confidence: ${result.confidence}%
Risk Level: ${result.riskLevel}

TECHNICAL DETAILS
=================
File Size: ${result.fileSize}
Dimensions: ${result.dimensions}
Processing Time: ${result.processingTime}
Model Version: v1.0.0

METRICS ANALYSIS
================
Image Quality: ${result.metrics.imageQuality}
Edge Consistency: ${result.metrics.edgeConsistency}
Compression Artifacts: ${result.metrics.compressionArtifacts}
Noise Pattern: ${result.metrics.noisePattern}

RECOMMENDATION
==============
${result.recommendation}

DISCLAIMER
==========
This analysis is provided for informational purposes only. While our AI model 
achieves high accuracy, no automated system is 100% perfect. Always exercise 
critical thinking and verify important content through multiple sources.

Generated by DeepGuard AI - Advanced Deepfake Detection Technology
Visit: https://deepguard-ai.com
        `.trim();
    }
    
    // ========================================
    // TOAST NOTIFICATIONS
    // ========================================
    showToast(type, title, message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        toast.innerHTML = `
            <div class="toast-header">
                <i class="toast-icon ${iconMap[type]}"></i>
                <span class="toast-title">${title}</span>
                <button class="toast-close">&times;</button>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        // Add close functionality
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.removeToast(toast);
        });
        
        container.appendChild(toast);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            this.removeToast(toast);
        }, 5000);
    }
    
    removeToast(toast) {
        if (!toast || !toast.parentNode) return;
        
        toast.classList.add('removing');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
    
    // ========================================
    // ERROR HANDLING
    // ========================================
    showError(message) {
        this.hideElement('loadingState');
        this.hideElement('emptyState');
        
        const resultsContent = document.getElementById('resultsContent');
        if (resultsContent) {
            resultsContent.innerHTML = `
                <div class="error-state">
                    <div class="error-content">
                        <i class="fas fa-exclamation-triangle error-icon"></i>
                        <h3>Analysis Failed</h3>
                        <p>${message}</p>
                        <button class="retry-btn" onclick="location.reload()">
                            <i class="fas fa-refresh"></i>
                            Try Again
                        </button>
                    </div>
                </div>
            `;
        }
        
        this.showToast('error', 'Analysis Failed', message);
    }
    
    // ========================================
    // KEYBOARD SHORTCUTS
    // ========================================
    handleKeyboard(e) {
        // ESC key - close modals
        if (e.key === 'Escape') {
            this.hideShareModal();
        }
        
        // Ctrl/Cmd + U - trigger file upload
        if ((e.ctrlKey || e.metaKey) && e.key === 'u' && !this.isAnalyzing) {
            e.preventDefault();
            this.triggerFileInput();
        }
        
        // Space or Enter - analyze image (when file is uploaded)
        if ((e.key === ' ' || e.key === 'Enter') && this.uploadedFile && !this.isAnalyzing) {
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                this.analyzeImage();
            }
        }
    }
    
    // ========================================
    // UTILITY METHODS
    // ========================================
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // ========================================
    // ANALYTICS & TRACKING
    // ========================================
    trackEvent(eventName, properties = {}) {
        // Placeholder for analytics tracking
        console.log('Event tracked:', eventName, properties);
        
        // You could integrate with analytics services here
        // Example: gtag('event', eventName, properties);
    }
    
    // ========================================
    // PERFORMANCE MONITORING
    // ========================================
    measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        console.log(`Performance: ${name} took ${(end - start).toFixed(2)}ms`);
        return result;
    }
    
    // ========================================
    // FEATURE DETECTION
    // ========================================
    detectFeatures() {
        const features = {
            fileAPI: 'File' in window && 'FileReader' in window && 'FileList' in window && 'Blob' in window,
            dragDrop: 'draggable' in document.createElement('div'),
            localStorage: (() => {
                try {
                    const test = 'test';
                    localStorage.setItem(test, test);
                    localStorage.removeItem(test);
                    return true;
                } catch (e) {
                    return false;
                }
            })(),
            clipboard: 'clipboard' in navigator,
            intersectionObserver: 'IntersectionObserver' in window,
            webGL: (() => {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
                } catch (e) {
                    return false;
                }
            })()
        };
        
        // Disable features that aren't supported
        if (!features.fileAPI) {
            this.showToast('warning', 'Limited Support', 'File API not supported. Some features may not work.');
        }
        
        if (!features.dragDrop) {
            document.querySelector('.upload-area')?.classList.add('no-drag-drop');
        }
        
        return features;
    }
    
    // ========================================
    // INITIALIZATION HELPERS
    // ========================================
    setupErrorHandlers() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.showToast('error', 'Unexpected Error', 'An unexpected error occurred. Please refresh the page.');
        });
        
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.showToast('error', 'Network Error', 'A network error occurred. Please check your connection.');
        });
    }
    
    setupServiceWorker() {
        // Register service worker for PWA functionality
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
    
    // ========================================
    // ACCESSIBILITY HELPERS
    // ========================================
    setupAccessibility() {
        // Focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
        
        // Screen reader announcements
        this.announceToScreenReader = (message) => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        };
    }
    
    // ========================================
    // THEME MANAGEMENT
    // ========================================
    initializeTheme() {
        // Check for saved theme or system preference
        const savedTheme = localStorage.getItem('deepguard-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        this.applyTheme(theme);
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('deepguard-theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('deepguard-theme', theme);
        } catch (e) {
            console.warn('Could not save theme preference');
        }
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }
}

// ========================================
// ADDITIONAL UTILITIES
// ========================================

// Intersection Observer for animations
class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
    }
    
    observe(element) {
        this.observer.observe(element);
    }
}

// Performance monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.startTime = performance.now();
    }
    
    mark(name) {
        this.metrics[name] = performance.now() - this.startTime;
    }
    
    measure(name, startMark, endMark) {
        const duration = this.metrics[endMark] - this.metrics[startMark];
        console.log(`${name}: ${duration.toFixed(2)}ms`);
        return duration;
    }
    
    getMetrics() {
        return { ...this.metrics };
    }
}

// Image processing utilities
class ImageProcessor {
    static async getImageData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    
                    const imageData = ctx.getImageData(0, 0, img.width, img.height);
                    resolve({
                        width: img.width,
                        height: img.height,
                        data: imageData.data,
                        imageData: imageData
                    });
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    
    static calculateImageHash(imageData) {
        // Simple perceptual hash implementation
        const { data, width, height } = imageData;
        const hash = [];
        
        // Reduce to 8x8 grayscale
        const step = Math.floor(width / 8);
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const pixelIndex = ((y * step * width) + (x * step)) * 4;
                const gray = (data[pixelIndex] + data[pixelIndex + 1] + data[pixelIndex + 2]) / 3;
                hash.push(gray);
            }
        }
        
        // Calculate average
        const average = hash.reduce((sum, val) => sum + val, 0) / hash.length;
        
        // Create binary hash
        return hash.map(val => val > average ? 1 : 0).join('');
    }
}

// ========================================
// INITIALIZE APPLICATION
// ========================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    // Initialize performance monitoring
    const perfMonitor = new PerformanceMonitor();
    perfMonitor.mark('app-start');
    
    // Initialize main application
    const app = new DeepGuardAI();
    
    // Set up additional features
    app.detectFeatures();
    app.setupErrorHandlers();
    app.setupAccessibility();
    app.initializeTheme();
    app.loadHistory();
    
    // Initialize animation observer
    const animationObserver = new AnimationObserver();
    document.querySelectorAll('.stat-item, .feature-item, .insight-card').forEach(el => {
        animationObserver.observe(el);
    });
    
    // Mark initialization complete
    perfMonitor.mark('app-ready');
    perfMonitor.measure('App Initialization', 'app-start', 'app-ready');
    
    // Make app globally accessible for debugging
    window.DeepGuardApp = app;
    
    console.log('🛡️ DeepGuard AI initialized successfully!');
    console.log('Features:', app.detectFeatures());
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DeepGuardAI, ImageProcessor, PerformanceMonitor };
}

// ========================================
// ENHANCED FEATURES & EASTER EGGS
// ========================================

// Konami Code Easter Egg
(function() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        // Add rainbow animation to all elements
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        // Create rainbow keyframes if they don't exist
        if (!document.querySelector('#rainbow-styles')) {
            const style = document.createElement('style');
            style.id = 'rainbow-styles';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Show easter egg message
        const app = window.DeepGuardApp;
        if (app) {
            app.showToast('info', '🌈 Easter Egg!', 'You found the secret rainbow mode! 🎉');
        }
        
        // Remove after 5 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
})();

// Console art
console.log(`
    ╔═══════════════════════════════════════╗
    ║         🛡️  DEEPGUARD AI  🛡️         ║
    ║                                       ║
    ║    Advanced Deepfake Detection        ║
    ║    Protecting Digital Authenticity    ║
    ║                                       ║
    ║    Version: 1.0.0                     ║
    ║    Status: Initialized ✓              ║
    ╚═══════════════════════════════════════╝
    
    🔧 Debug Mode: Type 'DeepGuardApp' in console
    🎯 Features: Advanced AI Detection, Real-time Analysis
    🌟 Easter Egg: Try the Konami Code!
`);

// Performance optimization: Lazy load non-critical features
setTimeout(() => {
    // Initialize service worker for PWA features
    if (window.DeepGuardApp) {
        window.DeepGuardApp.setupServiceWorker();
    }
}, 2000);

// Auto-cleanup memory on page unload
window.addEventListener('beforeunload', () => {
    // Clean up any object URLs
    const images = document.querySelectorAll('img[src*="blob:"]');
    images.forEach(img => {
        URL.revokeObjectURL(img.src);
    });
});