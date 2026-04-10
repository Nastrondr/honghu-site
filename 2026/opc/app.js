// ===== Particle Background =====
function initParticles() {
  const container = document.getElementById('particleBg');
  if (!container) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 20}s`;
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    container.appendChild(particle);
  }
}

// ===== Navigation =====
function initNavigation() {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Mobile toggle
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }
}

// ===== Counter Animation =====
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + (counter.classList.contains('stat-number-lg') ? '' : '+');
      }
    };
    
    // Use IntersectionObserver to start animation when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// ===== Render Policies =====
function renderPolicies(filter = 'all') {
  const grid = document.getElementById('policiesGrid');
  if (!grid) return;
  
  const filteredPolicies = filter === 'all' 
    ? policies 
    : policies.filter(p => p.category === filter);
  
  grid.innerHTML = filteredPolicies.map(policy => `
    <div class="card" data-policy-id="${policy.id}">
      <div class="card-header">
        <div class="card-badges">
          <span class="badge-small badge-accent">${categoryLabels[policy.category]}</span>
          <span class="badge-small badge-outline">${levelLabels[policy.level]}</span>
        </div>
      </div>
      <h3 class="card-title">${policy.title}</h3>
      <p class="card-desc">${policy.summary}</p>
      <div class="card-meta">
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${policy.region}
        </span>
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          ${policy.updateDate}
        </span>
      </div>
      ${policy.supportAmount ? `
        <div class="card-amount">
          <span class="card-amount-label">支持额度</span>
          <span class="card-amount-value">${policy.supportAmount}</span>
        </div>
      ` : ''}
      <div class="card-link">
        查看详情
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </div>
  `).join('');
  
  // Add click handlers
  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const policyId = card.getAttribute('data-policy-id');
      const policy = policies.find(p => p.id === policyId);
      if (policy) {
        showPolicyModal(policy);
      }
    });
  });
}

// ===== Render Parks =====
function renderParks(cityFilter = 'all') {
  const grid = document.getElementById('parksGrid');
  if (!grid) return;
  
  const filteredParks = cityFilter === 'all' 
    ? parks 
    : parks.filter(p => p.city === cityFilter);
  
  grid.innerHTML = filteredParks.map(park => `
    <div class="card" data-park-id="${park.id}">
      <div class="card-header">
        <span class="badge-small badge-accent">${park.type}</span>
      </div>
      <h3 class="card-title">${park.name}</h3>
      <div class="card-meta">
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${park.city}
        </span>
        <span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          ${park.area}
        </span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem;">
        ${park.features.slice(0, 3).map(f => `
          <span style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: #f0f4f8; border-radius: 100px; color: #64748b;">${f}</span>
        `).join('')}
        ${park.features.length > 3 ? `
          <span style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: #f0f4f8; border-radius: 100px; color: #64748b;">+${park.features.length - 3}</span>
        ` : ''}
      </div>
      <div class="card-link" style="margin-top: 1rem;">
        查看详情
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </div>
  `).join('');
  
  // Add click handlers
  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const parkId = card.getAttribute('data-park-id');
      const park = parks.find(p => p.id === parkId);
      if (park) {
        showParkModal(park);
      }
    });
  });
}

// ===== Render Process Steps =====
function renderProcessSteps() {
  const container = document.getElementById('processSteps');
  if (!container) return;
  
  const icons = {
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
    handshake: '<path d="M11 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2z"/><path d="M6 7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H6z"/><path d="M16 7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2z"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'
  };
  
  container.innerHTML = processSteps.map((step, index) => `
    <div class="process-step" data-step="${index}">
      <div class="step-content">
        <div class="step-header">
          <div class="step-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              ${icons[step.icon]}
            </svg>
          </div>
          <h3 class="step-title">${step.title}</h3>
        </div>
        <p class="step-desc">${step.description}</p>
        <div class="step-details">
          ${step.details.map(detail => `
            <div class="step-detail">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              ${detail}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="step-node">${index + 1}</div>
      <div></div>
    </div>
  `).join('');
  
  // Animate on scroll
  const steps = container.querySelectorAll('.process-step');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Update timeline progress
        const stepIndex = parseInt(entry.target.getAttribute('data-step'));
        const progress = document.querySelector('.timeline-progress');
        if (progress) {
          progress.style.height = `${((stepIndex + 1) / steps.length) * 100}%`;
        }
      }
    });
  }, { threshold: 0.5 });
  
  steps.forEach(step => observer.observe(step));
}

// ===== Render Updates =====
function renderUpdates() {
  const container = document.getElementById('updatesList');
  if (!container) return;
  
  container.innerHTML = updateLog.map((update, index) => `
    <div class="update-item">
      <div class="update-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>
      <div class="update-content">
        <div class="update-header">
          <span class="update-date">${update.date}</span>
          ${update.isNew ? '<span class="update-badge">最新</span>' : ''}
        </div>
        <p class="update-text">${update.content}</p>
      </div>
    </div>
  `).join('');
}

// ===== Show Policy Modal =====
function showPolicyModal(policy) {
  const modal = document.getElementById('policyModal');
  const body = document.getElementById('policyModalBody');
  
  body.innerHTML = `
    <div class="modal-header">
      <div class="modal-badges">
        <span class="badge-small badge-accent">${categoryLabels[policy.category]}</span>
        <span class="badge-small badge-outline">${levelLabels[policy.level]}</span>
        <span class="badge-small badge-outline">${policy.region}</span>
      </div>
      <h2 class="modal-title">${policy.title}</h2>
    </div>
    
    <div class="modal-section">
      <h4>政策简介</h4>
      <p>${policy.summary}</p>
    </div>
    
    <div class="modal-section">
      <h4>核心要点</h4>
      <ul class="modal-list">
        ${policy.keyPoints.map(point => `<li>${point}</li>`).join('')}
      </ul>
    </div>
    
    ${policy.supportAmount ? `
      <div class="modal-highlight">
        <div class="modal-highlight-label">支持额度</div>
        <div class="modal-highlight-value">${policy.supportAmount}</div>
      </div>
    ` : ''}
    
    <div class="modal-info-grid">
      <div>
        <span>发布日期：</span>
        <span>${policy.publishDate}</span>
      </div>
      <div>
        <span>更新日期：</span>
        <span>${policy.updateDate}</span>
      </div>
    </div>
    
    ${policy.contact ? `
      <div class="modal-section" style="margin-top: 1rem;">
        <h4>联系方式</h4>
        <p>${policy.contact}</p>
      </div>
    ` : ''}
    
    ${policy.applicationUrl ? `
      <a href="${policy.applicationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem; justify-content: center;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        前往申请
      </a>
    ` : ''}
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ===== Show Park Modal =====
function showParkModal(park) {
  const modal = document.getElementById('parkModal');
  const body = document.getElementById('parkModalBody');
  
  body.innerHTML = `
    <div class="modal-header">
      <div class="modal-badges">
        <span class="badge-small badge-accent">${park.type}</span>
        <span class="badge-small badge-outline">${park.city}</span>
      </div>
      <h2 class="modal-title">${park.name}</h2>
    </div>
    
    <div class="modal-info-grid" style="margin-bottom: 1.5rem;">
      <div>
        <span>城市：</span>
        <span>${park.city}</span>
      </div>
      <div>
        <span>面积：</span>
        <span>${park.area}</span>
      </div>
      <div>
        <span>类型：</span>
        <span>${park.type}</span>
      </div>
    </div>
    
    <div class="modal-tabs">
      <button class="modal-tab active" data-tab="features">园区特色</button>
      <button class="modal-tab" data-tab="subsidies">扶持政策</button>
      <button class="modal-tab" data-tab="process">入驻流程</button>
    </div>
    
    <div class="modal-tab-content active" data-tab-content="features">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
        ${park.features.map(f => `
          <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: #f0f4f8; border-radius: 8px; font-size: 0.875rem; color: #64748b;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            ${f}
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="modal-tab-content" data-tab-content="subsidies">
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${park.subsidies.map(s => `
          <div style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 1rem; background: rgba(0, 212, 170, 0.05); border-radius: 8px; border: 1px solid rgba(0, 212, 170, 0.1);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="2" style="flex-shrink: 0; margin-top: 2px;">
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span style="font-size: 0.9375rem; color: #1a2b3c;">${s}</span>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="modal-tab-content" data-tab-content="process">
      <div style="position: relative; padding-left: 2rem;">
        <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: rgba(0, 212, 170, 0.2);"></div>
        ${park.applicationProcess.map((step, i) => `
          <div style="position: relative; margin-bottom: 1rem;">
            <div style="position: absolute; left: -2rem; top: 0; width: 24px; height: 24px; background: #00d4aa; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600; transform: translateX(-11px);">${i + 1}</div>
            <div style="padding: 0.75rem; background: #f0f4f8; border-radius: 8px; font-size: 0.9375rem; color: #64748b;">${step}</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div style="margin-top: 1.5rem; padding: 1rem; background: #f0f4f8; border-radius: 8px;">
      <h4 style="font-size: 0.875rem; font-weight: 600; color: #1a2b3c; margin-bottom: 0.75rem;">联系方式</h4>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; color: #64748b;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          ${park.contact}
        </div>
        ${park.phone ? `
          <div style="display: flex; align-items: center; gap: 0.5rem; color: #64748b;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            ${park.phone}
          </div>
        ` : ''}
        ${park.email ? `
          <div style="display: flex; align-items: center; gap: 0.5rem; color: #64748b;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            ${park.email}
          </div>
        ` : ''}
        ${park.website ? `
          <a href="${park.website}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 0.5rem; color: #00d4aa;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            ${park.website}
          </a>
        ` : ''}
      </div>
    </div>
    
    ${park.website ? `
      <a href="${park.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; margin-top: 1rem; justify-content: center;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        前往申请入驻
      </a>
    ` : ''}
  `;
  
  // Add tab handlers
  setTimeout(() => {
    body.querySelectorAll('.modal-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        
        body.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
        body.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        body.querySelector(`[data-tab-content="${tabName}"]`).classList.add('active');
      });
    });
  }, 0);
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ===== Close Modals =====
function initModals() {
  const policyModal = document.getElementById('policyModal');
  const parkModal = document.getElementById('parkModal');
  const policyClose = document.getElementById('policyModalClose');
  const parkClose = document.getElementById('parkModalClose');
  
  function closeModals() {
    policyModal.classList.remove('active');
    parkModal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  policyClose.addEventListener('click', closeModals);
  parkClose.addEventListener('click', closeModals);
  
  policyModal.addEventListener('click', (e) => {
    if (e.target === policyModal) closeModals();
  });
  
  parkModal.addEventListener('click', (e) => {
    if (e.target === parkModal) closeModals();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModals();
  });
}

// ===== Filter Handlers =====
function initFilters() {
  // Policy filters
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPolicies(btn.getAttribute('data-filter'));
    });
  });
  
  // Park filters
  document.querySelectorAll('[data-city]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-city]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderParks(btn.getAttribute('data-city'));
    });
  });
}

// ===== Subscribe Form =====
function initSubscribeForm() {
  const form = document.getElementById('subscribeForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    alert(`感谢订阅！我们将把最新OPC政策资讯发送到 ${email}`);
    form.reset();
  });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavigation();
  animateCounters();
  renderPolicies();
  renderParks();
  renderProcessSteps();
  renderUpdates();
  initModals();
  initFilters();
  initSubscribeForm();
});
