// Global state
let allModels = [];
let pricingData = {};
let generalData = {};
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
let currentFilters = {};

// Popular Models with real-world latency benchmarks
// Data sourced from Voice AI Guide (Pipecat community) - May 2025 benchmarks
// ttftMin = median TTFT, ttftMax = P95 TTFT
const POPULAR_MODELS_DATA = [
    // OpenAI Models (from Voice AI Guide - May 2025)
    { 
        provider: 'openai', 
        name: 'gpt-4o', 
        displayName: 'GPT-4o',
        outputSpeed: 180, // tokens/sec
        ttftMin: 460, ttftMax: 580, // Voice AI Guide: 460ms median, 580ms P95
        contextWindow: 128000,
        tier: 'flagship',
        voiceAIReady: true // Good for voice AI (<500ms target)
    },
    { 
        provider: 'openai', 
        name: 'gpt-4o-mini', 
        displayName: 'GPT-4o Mini',
        outputSpeed: 300,
        ttftMin: 290, ttftMax: 420, // Voice AI Guide: 290ms median, 420ms P95
        contextWindow: 128000,
        tier: 'fast',
        voiceAIReady: true
    },
    { 
        provider: 'openai', 
        name: 'gpt-4.1', 
        displayName: 'GPT-4.1',
        outputSpeed: 150,
        ttftMin: 450, ttftMax: 670, // Voice AI Guide: 450ms median, 670ms P95
        contextWindow: 128000,
        tier: 'flagship',
        voiceAIReady: true
    },
    { 
        provider: 'openai', 
        name: 'gpt-4-turbo', 
        displayName: 'GPT-4 Turbo',
        outputSpeed: 120,
        ttftMin: 500, ttftMax: 700,
        contextWindow: 128000,
        tier: 'flagship',
        voiceAIReady: true
    },
    { 
        provider: 'openai', 
        name: 'o1', 
        displayName: 'o1 (Reasoning)',
        outputSpeed: 50,
        ttftMin: 2000, ttftMax: 10000, // Reasoning models are too slow for voice
        contextWindow: 200000,
        tier: 'reasoning',
        voiceAIReady: false
    },
    { 
        provider: 'openai', 
        name: 'o1-mini', 
        displayName: 'o1 Mini',
        outputSpeed: 80,
        ttftMin: 1000, ttftMax: 5000,
        contextWindow: 128000,
        tier: 'reasoning',
        voiceAIReady: false
    },
    
    // Anthropic Models - WARNING: Claude is too slow for voice AI!
    { 
        provider: 'anthropic', 
        name: 'claude-3-5-sonnet-20241022', 
        displayName: 'Claude 3.5 Sonnet',
        outputSpeed: 170,
        ttftMin: 1410, ttftMax: 2140, // Voice AI Guide: 1,410ms median, 2,140ms P95 - TOO SLOW!
        contextWindow: 200000,
        tier: 'flagship',
        voiceAIReady: false // Not recommended for voice AI due to high latency
    },
    { 
        provider: 'anthropic', 
        name: 'claude-3-7-sonnet', 
        displayName: 'Claude 3.7 Sonnet',
        outputSpeed: 170,
        ttftMin: 1410, ttftMax: 2140, // Voice AI Guide: Claude Sonnet 3.7 has 1,410ms median TTFT
        contextWindow: 200000,
        tier: 'flagship',
        voiceAIReady: false // Not recommended for voice AI
    },
    { 
        provider: 'anthropic', 
        name: 'claude-3-5-haiku-20241022', 
        displayName: 'Claude 3.5 Haiku',
        outputSpeed: 280,
        ttftMin: 600, ttftMax: 900, // Haiku is faster but still not ideal
        contextWindow: 200000,
        tier: 'fast',
        voiceAIReady: false
    },
    { 
        provider: 'anthropic', 
        name: 'claude-3-opus-20240229', 
        displayName: 'Claude 3 Opus',
        outputSpeed: 90,
        ttftMin: 1800, ttftMax: 3000, // Opus is even slower
        contextWindow: 200000,
        tier: 'flagship',
        voiceAIReady: false
    },
    
    // Google Models (from Voice AI Guide)
    { 
        provider: 'google', 
        name: 'gemini-2.0-flash', 
        displayName: 'Gemini 2.0 Flash',
        outputSpeed: 400,
        ttftMin: 380, ttftMax: 450, // Voice AI Guide: 380ms median, 450ms P95
        contextWindow: 1000000,
        tier: 'fast',
        voiceAIReady: true // Excellent for voice AI - fast and cheap!
    },
    { 
        provider: 'google', 
        name: 'gemini-2.0-flash-exp', 
        displayName: 'Gemini 2.0 Flash (Exp)',
        outputSpeed: 400,
        ttftMin: 380, ttftMax: 450, // Same as 2.0 Flash
        contextWindow: 1000000,
        tier: 'fast',
        voiceAIReady: true
    },
    { 
        provider: 'google', 
        name: 'gemini-1.5-pro', 
        displayName: 'Gemini 1.5 Pro',
        outputSpeed: 160,
        ttftMin: 400, ttftMax: 550,
        contextWindow: 2000000,
        tier: 'flagship',
        voiceAIReady: true
    },
    { 
        provider: 'google', 
        name: 'gemini-1.5-flash', 
        displayName: 'Gemini 1.5 Flash',
        outputSpeed: 250,
        ttftMin: 350, ttftMax: 450,
        contextWindow: 1000000,
        tier: 'fast',
        voiceAIReady: true
    },
    
    // Meta/Llama Models via Groq (from Voice AI Guide)
    { 
        provider: 'groq', 
        name: 'llama-4-maverick', 
        displayName: 'Llama 4 Maverick (Groq)',
        outputSpeed: 500,
        ttftMin: 290, ttftMax: 360, // Voice AI Guide: 290ms median, 360ms P95
        contextWindow: 128000,
        tier: 'ultra-fast',
        voiceAIReady: true // Excellent for voice AI
    },
    { 
        provider: 'groq', 
        name: 'llama-3.1-70b-versatile', 
        displayName: 'Groq Llama 3.1 70B',
        outputSpeed: 500,
        ttftMin: 100, ttftMax: 200, // Groq is exceptionally fast
        contextWindow: 128000,
        tier: 'ultra-fast',
        voiceAIReady: true
    },
    { 
        provider: 'groq', 
        name: 'llama-3.3-70b-versatile', 
        displayName: 'Groq Llama 3.3 70B',
        outputSpeed: 500,
        ttftMin: 100, ttftMax: 200,
        contextWindow: 128000,
        tier: 'ultra-fast',
        voiceAIReady: true
    },
    
    // Together AI
    { 
        provider: 'together-ai', 
        name: 'meta-llama/Llama-3.1-8B-Instruct-Turbo', 
        displayName: 'Llama 3.1 8B',
        outputSpeed: 450,
        ttftMin: 150, ttftMax: 250,
        contextWindow: 128000,
        tier: 'fast',
        voiceAIReady: true
    },
    { 
        provider: 'together-ai', 
        name: 'meta-llama/Llama-3.1-70B-Instruct-Turbo', 
        displayName: 'Llama 3.1 70B',
        outputSpeed: 100,
        ttftMin: 300, ttftMax: 450,
        contextWindow: 128000,
        tier: 'flagship',
        voiceAIReady: true
    },
    { 
        provider: 'together-ai', 
        name: 'meta-llama/Llama-3.1-405B-Instruct-Turbo', 
        displayName: 'Llama 3.1 405B',
        outputSpeed: 70,
        ttftMin: 600, ttftMax: 900,
        contextWindow: 128000,
        tier: 'flagship',
        voiceAIReady: false // Too slow for voice
    },
    
    // Cerebras (ultra-fast inference)
    { 
        provider: 'cerebras', 
        name: 'llama3.1-70b', 
        displayName: 'Cerebras Llama 3.1 70B',
        outputSpeed: 600,
        ttftMin: 80, ttftMax: 150,
        contextWindow: 128000,
        tier: 'ultra-fast',
        voiceAIReady: true
    },
    
    // Mistral Models
    { 
        provider: 'mistral-ai', 
        name: 'mistral-large-latest', 
        displayName: 'Mistral Large',
        outputSpeed: 150,
        ttftMin: 350, ttftMax: 500,
        contextWindow: 128000,
        tier: 'flagship',
        voiceAIReady: true
    },
    { 
        provider: 'mistral-ai', 
        name: 'mistral-small-latest', 
        displayName: 'Mistral Small',
        outputSpeed: 280,
        ttftMin: 200, ttftMax: 350,
        contextWindow: 32000,
        tier: 'fast',
        voiceAIReady: true
    },
    
    // DeepSeek
    { 
        provider: 'deepseek', 
        name: 'deepseek-chat', 
        displayName: 'DeepSeek V3',
        outputSpeed: 200,
        ttftMin: 300, ttftMax: 500,
        contextWindow: 64000,
        tier: 'flagship',
        voiceAIReady: true
    },
    
    // Cohere
    { 
        provider: 'cohere', 
        name: 'command-r-plus', 
        displayName: 'Command R+',
        outputSpeed: 120,
        ttftMin: 400, ttftMax: 600,
        contextWindow: 128000,
        tier: 'flagship',
        voiceAIReady: true
    },
    
    // Perplexity
    { 
        provider: 'perplexity-ai', 
        name: 'llama-3.1-sonar-large-128k-online', 
        displayName: 'Perplexity Sonar Large',
        outputSpeed: 180,
        ttftMin: 350, ttftMax: 500,
        contextWindow: 128000,
        tier: 'flagship',
        voiceAIReady: true
    }
];

// API Configuration
const PORTKEY_API_BASE = 'https://api.portkey.ai';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/Portkey-AI/models/main';
const USE_REMOTE_FIRST = true; // Set to false to use local static files only
const API_TIMEOUT = 5000; // 5 second timeout for API calls

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupTabs();
    setupEventListeners();
    renderModels();
    populateSelects();
    populateVoiceAIProviders();
    populatePopularModels();
    updateStatistics();
    renderFavorites();
    setTimeout(() => {
        updateVoiceLLMPricing();
        calculateVoiceAI();
        calculatePopularModel();
    }, 500);
});

// Helper function to fetch a file (local or remote)
async function fetchFile(filePath, timeout = 3000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(filePath, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// Helper function to fetch data with fallback (remote first, then local static file)
// Tries GitHub raw URLs first (as a form of remote API), then falls back to local files
async function fetchWithFallback(localFile, timeout = 5000) {
    if (!USE_REMOTE_FIRST) {
        // Directly use local file if remote is disabled
        try {
            const data = await fetchFile(localFile, timeout);
            return { data, source: 'local' };
        } catch (error) {
            throw error;
        }
    }
    
    // Extract provider name from local file path
    // e.g., "models/pricing/openai.json" -> "openai"
    const fileName = localFile.split('/').pop();
    const provider = fileName.replace('.json', '');
    const isPricing = localFile.includes('/pricing/');
    const remotePath = isPricing 
        ? `${GITHUB_RAW_BASE}/pricing/${fileName}`
        : `${GITHUB_RAW_BASE}/general/${fileName}`;
    
    try {
        // Try remote source (GitHub raw URL) first
        const data = await fetchFile(remotePath, timeout);
        console.log(`Loaded from remote: ${remotePath}`);
        return { data, source: 'remote' };
    } catch (remoteError) {
        // Remote failed, fall back to local file
        console.log(`Remote failed for ${remotePath}, using local file: ${localFile}`);
        try {
            const data = await fetchFile(localFile, timeout);
            return { data, source: 'local' };
        } catch (localError) {
            console.error(`Both remote and local failed for ${fileName}:`, localError.message);
            throw new Error(`Failed to load ${fileName} from both remote and local sources`);
        }
    }
}

// Helper function to fetch individual model data from Portkey API
// This can be used to refresh/update individual models in the future
async function fetchModelFromAPI(provider, modelName, type = 'pricing') {
    try {
        const endpoint = type === 'pricing' 
            ? `${PORTKEY_API_BASE}/model-configs/pricing/${provider}/${modelName}`
            : `${PORTKEY_API_BASE}/model-configs/general/${provider}/${modelName}`;
        
        const data = await fetchFile(endpoint, API_TIMEOUT);
        console.log(`Fetched ${type} for ${provider}:${modelName} from Portkey API`);
        return data;
    } catch (error) {
        console.log(`Portkey API fetch failed for ${provider}:${modelName} (${type}):`, error.message);
        return null;
    }
}

// Load pricing and general data with fallback handling
async function loadData() {
    try {
        document.getElementById('modelsGrid').innerHTML = 
            '<div class="loading"><div class="spinner"></div><p>Loading models...</p></div>';
        
        const providers = [
            'openai', 'anthropic', 'google', 'azure-openai', 'bedrock',
            'mistral-ai', 'cohere', 'together-ai', 'groq', 'deepseek',
            'fireworks-ai', 'perplexity-ai', 'anyscale', 'deepinfra',
            'cerebras', 'x-ai', 'openrouter', 'vertex-ai'
        ];
        
        const loadPromises = [];
        let loadedCount = 0;
        
        for (const provider of providers) {
            // Try different file name variations for pricing
            const pricingFileVariations = [
                `models/pricing/${provider}.json`,
                `models/pricing/${provider.replace('-', '')}.json`
            ];
            
            // Try different file name variations for general
            const generalFileVariations = [
                `models/general/${provider}.json`,
                `models/general/${provider.replace('-', '')}.json`,
                `models/general/${provider.replace('-', '_')}.json`
            ];
            
            // Load pricing data (try each file variation until one works)
            let pricingLoaded = false;
            for (const filePath of pricingFileVariations) {
                if (pricingLoaded) break;
                
                loadPromises.push(
                    fetchWithFallback(filePath)
                        .then(result => {
                            if (result && result.data && !pricingLoaded) {
                                const prov = filePath.split('/').pop().replace('.json', '');
                                if (!pricingData[prov]) {
                                    pricingData[prov] = result.data;
                                    pricingLoaded = true;
                                    loadedCount++;
                                }
                            }
                        })
                        .catch(() => {})
                );
            }
            
            // Load general data (try each file variation until one works)
            let generalLoaded = false;
            for (const filePath of generalFileVariations) {
                if (generalLoaded) break;
                
                loadPromises.push(
                    fetchWithFallback(filePath)
                        .then(result => {
                            if (result && result.data && !generalLoaded) {
                                const prov = filePath.split('/').pop().replace('.json', '');
                                if (!generalData[prov]) {
                                    generalData[prov] = result.data;
                                    generalLoaded = true;
                                    loadedCount++;
                                }
                            }
                        })
                        .catch(() => {})
                );
            }
        }
        
        await Promise.all(loadPromises);
        combineModelData();
        
        const pricingCount = Object.keys(pricingData).length;
        const generalCount = Object.keys(generalData).length;
        console.log(`Loaded ${pricingCount} pricing files and ${generalCount} general files`);
        console.log(`Total models available: ${allModels.length}`);
        
        if (allModels.length === 0) {
            document.getElementById('modelsGrid').innerHTML = 
                '<div class="loading"><p>No models loaded. Make sure you\'re running a local server or have internet access.</p></div>';
        }
        
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('modelsGrid').innerHTML = 
            '<div class="loading"><p>Error loading data. Make sure you\'re running a local server.</p></div>';
    }
}

// Combine pricing and general data
function combineModelData() {
    allModels = [];
    
    for (const provider in pricingData) {
        const pricing = pricingData[provider];
        const general = generalData[provider] || {};
        
        for (const modelName in pricing) {
            if (modelName === 'default') continue;
            
            const modelPricing = pricing[modelName];
            const modelGeneral = general[modelName] || general.default || {};
            
            if (!modelPricing.pricing_config) continue;
            
            const model = {
                name: modelName,
                provider: provider,
                pricing: modelPricing.pricing_config || {},
                config: modelGeneral,
                type: modelGeneral.type?.primary || 'chat',
                supported: modelGeneral.type?.supported || [],
                maxTokens: getMaxTokens(modelGeneral),
                params: modelGeneral.params || []
            };
            
            allModels.push(model);
        }
    }
    
    allModels.sort((a, b) => a.name.localeCompare(b.name));
    console.log(`Loaded ${allModels.length} models from ${Object.keys(pricingData).length} providers`);
}

// Get maximum context window size (in tokens)
// This is the maximum number of tokens a model can process in a single request
function getMaxTokens(config) {
    const maxTokenParam = config.params?.find(p => p.key === 'max_tokens' || p.key === 'max_completion_tokens');
    return maxTokenParam?.maxValue || null;
}

// Setup tab switching
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
            
            if (targetTab === 'statistics') {
                updateStatistics();
            } else if (targetTab === 'favorites') {
                renderFavorites();
            } else if (targetTab === 'voice') {
                calculateVoiceAI();
            } else if (targetTab === 'calculator') {
                calculateCost();
            } else if (targetTab === 'chat-agent') {
                populateChatAgentModels();
            } else if (targetTab === 'multimodal') {
                populateMultiModalModels();
            } else if (targetTab === 'popular-models') {
                calculatePopularModel();
            }
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('modelSearch').addEventListener('input', renderModels);
    document.getElementById('providerFilter').addEventListener('change', renderModels);
    document.getElementById('typeFilter').addEventListener('change', renderModels);
    document.getElementById('featureFilter').addEventListener('change', renderModels);
    document.getElementById('maxPriceFilter').addEventListener('input', renderModels);
    
    const calcInputs = ['calcModelSelect', 'inputTokens', 'outputTokens', 
                       'cacheReadTokens', 'cacheWriteTokens', 'webSearches', 
                       'fileSearches', 'thinkingTokens', 'numRequests',
                       'networkLatency', 'processingSpeed', 'enableStreaming'];
    calcInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculateCost);
            el.addEventListener('change', calculateCost);
        }
    });
    
    // Popular Models event listeners
    const popularInputs = ['popularModelSelect', 'popularInputTokens', 'popularOutputTokens', 
                          'popularNumRequests', 'popularStreamingMode', 'popularNetworkLatency', 'popularRegion'];
    popularInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculatePopularModel);
            el.addEventListener('change', calculatePopularModel);
        }
    });
    
    // Region selector updates network latency
    document.getElementById('popularRegion')?.addEventListener('change', (e) => {
        const networkLatencyInput = document.getElementById('popularNetworkLatency');
        if (networkLatencyInput && e.target.value !== 'custom') {
            const latencies = { us: 50, eu: 80, asia: 120 };
            networkLatencyInput.value = latencies[e.target.value] || 50;
            calculatePopularModel();
        }
    });
    
    document.getElementById('compareModel1')?.addEventListener('change', compareModels);
    document.getElementById('compareModel2')?.addEventListener('change', compareModels);
    ['compareInputTokens', 'compareOutputTokens', 'compareNumRequests', 'compareProcessingSpeed'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', compareModels);
            el.addEventListener('change', compareModels);
        }
    });
    
    // Voice AI calculator
    const voiceProviderInputs = ['voiceLLMProvider', 'voiceSTTProvider', 'voiceTTSProvider'];
    voiceProviderInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', () => {
                updateVoiceLLMPricing();
                calculateVoiceAI();
            });
        }
    });
    
    const voiceInputs = ['transcriptionCost', 'voiceCost', 'vcpuCost', 'agentsPerVCPU',
                        'convoLength', 'wordsPerMin', 'tokensPerWord', 'charsPerWord',
                        'turnsPerMin', 'llmSpeechRatio', 'contextWindowTurns'];
    voiceInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculateVoiceAI);
            el.addEventListener('change', calculateVoiceAI);
        }
    });
    
}

// Populate Voice AI provider dropdowns
function populateVoiceAIProviders() {
    const llmSelect = document.getElementById('voiceLLMProvider');
    const sttSelect = document.getElementById('voiceSTTProvider');
    const ttsSelect = document.getElementById('voiceTTSProvider');
    
    if (!llmSelect || !sttSelect || !ttsSelect) return;
    
    // Clear existing options
    [llmSelect, sttSelect, ttsSelect].forEach(select => {
        while (select.children.length > 0) {
            select.removeChild(select.firstChild);
        }
    });
    
    // Add LLM models
    const popularLLMs = [
        { provider: 'openai', name: 'gpt-4o', label: 'GPT-4o (OpenAI)' },
        { provider: 'openai', name: 'gpt-4o-mini', label: 'GPT-4o-mini (OpenAI)' },
        { provider: 'openai', name: 'gpt-4.1', label: 'GPT-4.1 (OpenAI)' },
        { provider: 'openai', name: 'gpt-5', label: 'GPT-5 (OpenAI)' },
        { provider: 'anthropic', name: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet (Anthropic)' },
        { provider: 'anthropic', name: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku (Anthropic)' },
        { provider: 'google', name: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro (Google)' },
        { provider: 'google', name: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash (Google)' }
    ];
    
    popularLLMs.forEach(model => {
        const exists = allModels.find(m => m.provider === model.provider && m.name === model.name);
        if (exists) {
            const option = document.createElement('option');
            option.value = `${model.provider}:${model.name}`;
            option.textContent = model.label;
            llmSelect.appendChild(option);
        }
    });
    
    // Add STT models (2026 pricing)
    const sttModels = [
        // OpenAI models
        { provider: 'openai', name: 'gpt-4o-transcribe', label: 'GPT-4o-Transcribe (OpenAI) - $0.60/1K audio tokens' },
        { provider: 'openai', name: 'gpt-4o-mini-transcribe', label: 'GPT-4o-mini-Transcribe (OpenAI) - $0.30/1K audio tokens' },
        { provider: 'openai', name: 'whisper-1', label: 'Whisper-1 (OpenAI) - $0.60/1K audio tokens' },
        { provider: 'openai', name: 'gpt-4o-transcribe-diarize', label: 'GPT-4o-Transcribe-Diarize (OpenAI) - $0.60/1K audio tokens' },
        // Azure OpenAI models
        { provider: 'azure-openai', name: 'gpt-4o-transcribe', label: 'GPT-4o-Transcribe (Azure) - $0.60/1K audio tokens' },
        { provider: 'azure-openai', name: 'gpt-4o-mini-transcribe', label: 'GPT-4o-mini-Transcribe (Azure) - $0.30/1K audio tokens' },
        { provider: 'azure-openai', name: 'whisper-1', label: 'Whisper-1 (Azure) - $0.60/1K audio tokens' },
        // Manual entries with Voice AI Guide pricing (2025)
        // Deepgram - Industry leader for Voice AI (recommended)
        { provider: 'manual', name: 'deepgram-nova-2', label: 'Deepgram Nova-2 - $0.0043/min (BEST)' },
        { provider: 'manual', name: 'deepgram-nova-2-phonecall', label: 'Deepgram Nova-2 Phonecall - $0.0050/min' },
        // Gladia - Best for multilingual
        { provider: 'manual', name: 'gladia-enhanced', label: 'Gladia Enhanced (Multilingual) - $0.0066/min' },
        // Whisper variants
        { provider: 'manual', name: 'whisper-v3', label: 'Whisper V3 (OpenAI) - $0.006/min' },
        { provider: 'manual', name: 'groq-whisper', label: 'Groq Whisper Large v3 - $0.003/min (fast)' },
        // AssemblyAI
        { provider: 'manual', name: 'assemblyai-best', label: 'AssemblyAI Best - $0.008/min' },
        // Google
        { provider: 'manual', name: 'google-chirp-2', label: 'Google Speech-to-Text Chirp 2 - $0.012/min' }
    ];
    
    sttModels.forEach(model => {
        if (model.provider === 'manual') {
            // Add manual models directly
            const option = document.createElement('option');
            option.value = `${model.provider}:${model.name}`;
            option.textContent = model.label;
            sttSelect.appendChild(option);
        } else {
            const exists = allModels.find(m => m.provider === model.provider && m.name === model.name);
            if (exists) {
                const option = document.createElement('option');
                option.value = `${model.provider}:${model.name}`;
                option.textContent = model.label;
                sttSelect.appendChild(option);
            }
        }
    });
    
    // Add TTS models (2026 pricing)
    const ttsModels = [
        // OpenAI models
        { provider: 'openai', name: 'tts-1', label: 'TTS-1 (OpenAI) - $15/1B chars' },
        { provider: 'openai', name: 'tts-1-hd', label: 'TTS-1-HD (OpenAI) - $30/1B chars' },
        { provider: 'openai', name: 'gpt-4o-mini-tts', label: 'GPT-4o-mini-TTS (OpenAI) - $1.50/1K audio tokens' },
        // Azure OpenAI models
        { provider: 'azure-openai', name: 'tts-1', label: 'TTS-1 (Azure) - $15/1B chars' },
        { provider: 'azure-openai', name: 'tts-1-hd', label: 'TTS-1-HD (Azure) - $30/1B chars' },
        { provider: 'azure-openai', name: 'tts', label: 'TTS (Azure) - $15/1B chars' },
        { provider: 'azure-openai', name: 'tts-hd', label: 'TTS-HD (Azure) - $30/1B chars' },
        // Manual entries with Voice AI Guide pricing (2025)
        // Deepgram Aura - CHEAPEST for Voice AI
        { provider: 'manual', name: 'deepgram-aura', label: 'Deepgram Aura - $0.008/min (CHEAPEST)' },
        // Cartesia - Recommended for Voice AI (SSM architecture)
        { provider: 'manual', name: 'cartesia-sonic', label: 'Cartesia Sonic - $0.02/min (RECOMMENDED)' },
        // ElevenLabs - High quality voices
        { provider: 'manual', name: 'elevenlabs-flash-v2', label: 'ElevenLabs Flash v2 - $0.04/min' },
        { provider: 'manual', name: 'elevenlabs-turbo-v2', label: 'ElevenLabs Turbo v2 - $0.08/min' },
        // Rime - Conversational speech
        { provider: 'manual', name: 'rime-conversational', label: 'Rime Conversational - $0.04/min' },
        // PlayHT
        { provider: 'manual', name: 'playht-turbo', label: 'PlayHT 2.0 Turbo - $0.05/min' },
        // Google
        { provider: 'manual', name: 'google-tts-standard', label: 'Google TTS Standard - $4/1B chars' },
        { provider: 'manual', name: 'google-tts-wavenet', label: 'Google TTS WaveNet - $16/1B chars' }
    ];
    
    ttsModels.forEach(model => {
        if (model.provider === 'manual') {
            // Add manual models directly
            const option = document.createElement('option');
            option.value = `${model.provider}:${model.name}`;
            option.textContent = model.label;
            ttsSelect.appendChild(option);
        } else {
            const exists = allModels.find(m => m.provider === model.provider && m.name === model.name);
            if (exists) {
                const option = document.createElement('option');
                option.value = `${model.provider}:${model.name}`;
                option.textContent = model.label;
                ttsSelect.appendChild(option);
            }
        }
    });
    
    // Set defaults
    if (llmSelect.options.length > 0) llmSelect.value = llmSelect.options[0].value;
    if (sttSelect.options.length > 0) sttSelect.value = sttSelect.options[0].value;
    if (ttsSelect.options.length > 0) ttsSelect.value = ttsSelect.options[0].value;
}

// Update LLM pricing based on selected provider
function updateVoiceLLMPricing() {
    const llmProvider = document.getElementById('voiceLLMProvider').value;
    const sttProvider = document.getElementById('voiceSTTProvider').value;
    const ttsProvider = document.getElementById('voiceTTSProvider').value;
    
    // Update LLM pricing display
    if (llmProvider) {
        const [llmProv, llmModel] = llmProvider.split(':');
        const llmModelData = allModels.find(m => m.provider === llmProv && m.name === llmModel);
        
        if (llmModelData) {
            const payg = llmModelData.pricing?.pay_as_you_go || {};
            const inputPrice = (payg.request_token?.price || 0) / 100; // Convert cents to dollars per 1K tokens
            const outputPrice = (payg.response_token?.price || 0) / 100;
            
            // Update the display (we'll show this in the pricing section)
            document.getElementById('llmInputPriceDisplay').textContent = `$${formatPrice(inputPrice)}/1B tokens`;
            document.getElementById('llmOutputPriceDisplay').textContent = `$${formatPrice(outputPrice)}/1B tokens`;
        }
    }
    
    // Update STT pricing
    if (sttProvider) {
        const [sttProv, sttModel] = sttProvider.split(':');
        const sttModelData = allModels.find(m => m.provider === sttProv && m.name === sttModel);
        
        if (sttModelData) {
            const payg = sttModelData.pricing?.pay_as_you_go || {};
            // For transcription, we need to calculate per minute
            // Audio tokens are typically ~100 tokens per minute of audio
            const audioTokenPrice = (payg.additional_units?.request_audio_token?.price || payg.request_token?.price || 0) / 100;
            const tokensPerMinute = 100; // Approximate
            const costPerMin = (audioTokenPrice * tokensPerMinute) / 1000; // Convert to $/min
            
            document.getElementById('transcriptionCost').value = costPerMin.toFixed(6);
            document.getElementById('sttPriceDisplay').textContent = `$${costPerMin.toFixed(6)}/min (from ${sttModel})`;
        }
    }
    
    // Update TTS pricing
    if (ttsProvider) {
        const [ttsProv, ttsModel] = ttsProvider.split(':');
        const ttsModelData = allModels.find(m => m.provider === ttsProv && m.name === ttsModel);
        
        if (ttsModelData) {
            const payg = ttsModelData.pricing?.pay_as_you_go || {};
            // TTS is typically priced per character or per token
            // OpenAI TTS: ~1 token per 4 characters, price is per 1K tokens
            const tokenPrice = (payg.request_token?.price || 0) / 100; // $ per 1K tokens
            const charsPerToken = 4; // Approximate
            const costPerChar = tokenPrice / 1000 / charsPerToken; // Convert to $/character
            
            document.getElementById('voiceCost').value = costPerChar.toFixed(9);
            document.getElementById('ttsPriceDisplay').textContent = `$${costPerChar.toFixed(9)}/char (from ${ttsModel})`;
        }
    }
}

// Populate dropdowns
function populateSelects() {
    const providers = [...new Set(allModels.map(m => m.provider))].sort();
    const providerFilter = document.getElementById('providerFilter');
    const calcModelSelect = document.getElementById('calcModelSelect');
    const compareModel1 = document.getElementById('compareModel1');
    const compareModel2 = document.getElementById('compareModel2');
    
    providers.forEach(provider => {
        const option = document.createElement('option');
        option.value = provider;
        option.textContent = provider.charAt(0).toUpperCase() + provider.slice(1).replace('-', ' ');
        if (providerFilter) providerFilter.appendChild(option.cloneNode(true));
    });
    
    allModels.forEach(model => {
        const option = document.createElement('option');
        option.value = `${model.provider}:${model.name}`;
        option.textContent = `${model.name} (${model.provider})`;
        
        if (calcModelSelect) calcModelSelect.appendChild(option.cloneNode(true));
        if (compareModel1) compareModel1.appendChild(option.cloneNode(true));
        if (compareModel2) compareModel2.appendChild(option.cloneNode(true));
    });
}

// Render models with filters
function renderModels() {
    const searchTerm = document.getElementById('modelSearch').value.toLowerCase();
    const providerFilter = document.getElementById('providerFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const featureFilter = document.getElementById('featureFilter').value;
    const maxPrice = parseFloat(document.getElementById('maxPriceFilter').value) || Infinity;
    
    currentFilters = { searchTerm, providerFilter, typeFilter, featureFilter, maxPrice };
    
    // Check if any filter is selected
    const hasFilter = searchTerm || providerFilter || typeFilter || featureFilter || (maxPrice !== Infinity);
    
    if (!hasFilter) {
        document.getElementById('modelCount').textContent = 'Select filters to view models';
        document.getElementById('modelsGrid').innerHTML = `
            <div class="placeholder" style="padding: 80px 20px;">
                <div style="font-size: 16px; margin-bottom: 12px; font-weight: 600;">No models displayed</div>
                <div style="font-size: 12px; color: var(--white);">Please select at least one filter above to explore models</div>
            </div>
        `;
        document.getElementById('exportCSVBtn').disabled = true;
        document.getElementById('exportJSONBtn').disabled = true;
        return;
    }
    
    let filtered = allModels.filter(model => {
        if (searchTerm && !model.name.toLowerCase().includes(searchTerm) && 
            !model.provider.toLowerCase().includes(searchTerm)) {
            return false;
        }
        if (providerFilter && model.provider !== providerFilter) return false;
        if (typeFilter && model.type !== typeFilter) return false;
        if (featureFilter && !model.supported.includes(featureFilter)) return false;
        
        const inputPrice = getInputPrice(model);
        if (inputPrice > maxPrice) return false;
        
        return true;
    });
    
    document.getElementById('modelCount').textContent = 
        `Showing ${filtered.length} of ${allModels.length} models`;
    
    const grid = document.getElementById('modelsGrid');
    const exportCSVBtn = document.getElementById('exportCSVBtn');
    const exportJSONBtn = document.getElementById('exportJSONBtn');
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="placeholder" style="padding: 80px 20px;">
                <div style="font-size: 16px; margin-bottom: 12px; font-weight: 600;">No models found</div>
                <div style="font-size: 12px; color: var(--white);">Try adjusting your filters or search terms</div>
            </div>
        `;
        exportCSVBtn.disabled = true;
        exportJSONBtn.disabled = true;
        return;
    }
    
    grid.innerHTML = filtered.map(model => createModelCard(model)).join('');
    exportCSVBtn.disabled = false;
    exportJSONBtn.disabled = false;
}

// Create model card HTML
function createModelCard(model) {
    const inputPrice = getInputPrice(model);
    const outputPrice = getOutputPrice(model);
    const modelKey = `${model.provider}:${model.name}`;
    const isFavorite = favorites.includes(modelKey);
    
    const features = model.supported.map(f => 
        `<span class="feature-badge">${f}</span>`
    ).join('');
    
    return `
        <div class="model-card" onclick="showModelDetail('${model.provider}', '${model.name}')">
            <div class="model-actions">
                <button class="icon-btn ${isFavorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite('${modelKey}')" title="Favorite">
                    ${isFavorite ? '★' : '☆'}
                </button>
            </div>
            <div class="model-header">
                <div>
                    <div class="model-name">${model.name}</div>
                    <div class="model-provider">${model.provider}</div>
                </div>
                <span class="model-type">${model.type}</span>
            </div>
            <div class="model-pricing">
                <div class="price-item">
                    <span class="price-label">Input</span>
                    <span class="price-value">$${formatPrice(inputPrice)}/1B</span>
                </div>
                <div class="price-item">
                    <span class="price-label">Output</span>
                    <span class="price-value">$${formatPrice(outputPrice)}/1B</span>
                </div>
                ${model.maxTokens ? `
                <div class="price-item">
                    <span class="price-label">Context Window</span>
                    <span class="price-value">${formatNumber(model.maxTokens)} tokens</span>
                </div>
                ` : ''}
            </div>
            ${features ? `<div class="model-features">${features}</div>` : ''}
        </div>
    `;
}

// Get pricing values
function getInputPrice(model) {
    const payg = model.pricing?.pay_as_you_go;
    return payg?.request_token?.price || 0;
}

function getOutputPrice(model) {
    const payg = model.pricing?.pay_as_you_go;
    return payg?.response_token?.price || 0;
}

function formatPrice(price) {
    if (price === 0) return '0.00';
    // Price is in cents per token, convert to dollars per billion tokens
    // cents/token / 100 = $/token * 1,000,000,000 = $/billion
    return ((price / 100) * 1000000000).toFixed(2);
}

// Get model-specific processing speed (tokens/sec) based on model characteristics
// Updated for 2026 performance benchmarks
function getModelProcessingSpeed(modelName) {
    const name = modelName.toLowerCase();
    
    // Ultra-fast models (300+ tok/s) - 2026 optimized
    if (name.includes('gemini-2') || name.includes('gemini-2.0-flash')) {
        return 400;
    }
    if (name.includes('gpt-4o-mini') || name.includes('gpt-4.1-mini')) {
        return 300;
    }
    if (name.includes('claude-3-5-haiku') || name.includes('claude-3.5-haiku') || name.includes('claude-instant')) {
        return 280;
    }
    
    // Very fast models (200-300 tok/s)
    if (name.includes('gemini-1.5-flash') || name.includes('gemini-flash')) {
        return 250;
    }
    if (name.includes('gpt-3.5') || name.includes('gpt-4.1-nano')) {
        return 250;
    }
    if (name.includes('llama-3.1-8b') || name.includes('llama-3-8b') || name.includes('llama-3.2-3b')) {
        return 450;
    }
    if (name.includes('mistral-7b') || name.includes('mixtral-8x7b')) {
        return 350;
    }
    
    // Fast models (150-200 tok/s)
    if (name.includes('gpt-4o') || name.includes('gpt-4.1')) {
        return 180;
    }
    if (name.includes('claude-3.5-sonnet') || name.includes('claude-3-5-sonnet') || name.includes('claude-sonnet-4')) {
        return 170;
    }
    if (name.includes('gemini-1.5-pro') || name.includes('gemini-pro') || name.includes('gemini-2.0-pro')) {
        return 160;
    }
    
    // Medium-fast models (100-150 tok/s)
    if (name.includes('claude-3-sonnet')) {
        return 140;
    }
    if (name.includes('gpt-4-turbo') || name.includes('gpt-4-0125')) {
        return 120;
    }
    if (name.includes('llama-3.1-70b') || name.includes('llama-3-70b')) {
        return 100;
    }
    
    // Medium models (70-100 tok/s)
    if (name.includes('gpt-4') || name.includes('claude-3-opus') || name.includes('claude-opus-4')) {
        return 90;
    }
    if (name.includes('llama-3.1-405b') || name.includes('llama-405b')) {
        return 70;
    }
    
    // Slower/older models (40-70 tok/s)
    if (name.includes('claude-v1') || name.includes('claude-v2')) {
        return 60;
    }
    if (name.includes('j2-') || name.includes('jurassic')) {
        return 50;
    }
    if (name.includes('llama-2') || name.includes('llama2')) {
        return 70;
    }
    
    // Default for unknown models (conservative 2026 estimate)
    return 100;
}

function formatPricePer1K(price) {
    if (price === 0) return '0.00';
    return (price / 100).toFixed(4);
}

function formatNumber(num) {
    return num.toLocaleString();
}

function formatLatency(ms) {
    if (ms < 1000) {
        return `${Math.round(ms)} ms`;
    } else if (ms < 60000) {
        return `${(ms / 1000).toFixed(1)} s`;
    } else if (ms < 3600000) {
        return `${(ms / 60000).toFixed(1)} min`;
    } else {
        return `${(ms / 3600000).toFixed(2)} hours`;
    }
}

// Calculate cost with latency
function calculateCost() {
    const modelValue = document.getElementById('calcModelSelect').value;
    if (!modelValue) {
        document.getElementById('costDetails').innerHTML = '';
        document.getElementById('totalCost').textContent = '$0.00';
        document.getElementById('perRequestCost').textContent = '$0.00';
        document.getElementById('estimatedLatency').textContent = '0 ms';
        document.getElementById('latencyStatus').textContent = '-';
        document.getElementById('latencyBreakdownCalc').innerHTML = '';
        updateCostChart({});
        updateTokenChart({});
        return;
    }
    
    const [provider, modelName] = modelValue.split(':');
    const model = allModels.find(m => m.provider === provider && m.name === modelName);
    if (!model) return;
    
    const inputTokens = parseFloat(document.getElementById('inputTokens').value) || 0;
    const outputTokens = parseFloat(document.getElementById('outputTokens').value) || 0;
    const cacheRead = parseFloat(document.getElementById('cacheReadTokens').value) || 0;
    const cacheWrite = parseFloat(document.getElementById('cacheWriteTokens').value) || 0;
    const webSearches = parseInt(document.getElementById('webSearches').value) || 0;
    const fileSearches = parseInt(document.getElementById('fileSearches').value) || 0;
    const thinkingTokens = parseFloat(document.getElementById('thinkingTokens').value) || 0;
    const numRequests = parseInt(document.getElementById('numRequests').value) || 1;
    const networkLatency = parseInt(document.getElementById('networkLatency').value) || 50;
    const processingSpeed = parseInt(document.getElementById('processingSpeed').value) || 100;
    const enableStreaming = document.getElementById('enableStreaming').checked;
    
    const payg = model.pricing?.pay_as_you_go || {};
    
    // Input tokens are in billions, convert to actual tokens for calculation
    // Price is in cents per token:
    //   - price / 100 = dollars per token
    //   - * 1,000,000,000 = dollars per billion tokens
    // Example: GPT-4o mini input = 0.000015 cents/token = $0.15/1M = $150/1B
    const inputPricePerBillion = (payg.request_token?.price || 0) / 100 * 1000000000; // $/billion tokens
    const outputPricePerBillion = (payg.response_token?.price || 0) / 100 * 1000000000; // $/billion tokens
    const cacheReadPricePerBillion = (payg.cache_read_input_token?.price || 0) / 100 * 1000000000;
    const cacheWritePricePerBillion = (payg.cache_write_input_token?.price || 0) / 100 * 1000000000;
    
    const inputCost = inputTokens * inputPricePerBillion;
    const outputCost = outputTokens * outputPricePerBillion;
    const cacheReadCost = cacheRead * cacheReadPricePerBillion;
    const cacheWriteCost = cacheWrite * cacheWritePricePerBillion;
    const webSearchCost = webSearches * (payg.additional_units?.web_search?.price || 0) / 100;
    const fileSearchCost = fileSearches * (payg.additional_units?.file_search?.price || 0) / 100;
    const thinkingCost = thinkingTokens * ((payg.additional_units?.thinking_token?.price || 0) / 100 * 1000000000);
    
    const totalPerRequest = inputCost + outputCost + cacheReadCost + cacheWriteCost + webSearchCost + fileSearchCost + thinkingCost;
    const total = totalPerRequest * numRequests;
    
    // Calculate latency
    // inputTokens are in billions, convert to actual tokens for latency calculation
    const inputTokensActual = inputTokens * 1000000000;
    const outputTokensActual = outputTokens * 1000000000;
    const cacheReadActual = cacheRead * 1000000000;
    const thinkingTokensActual = thinkingTokens * 1000000000;
    
    // Input processing is MUCH faster than output (often 50-100x) due to parallelization
    // Input encoding/embedding can process thousands of tokens per second
    // Use much higher effective speed for input processing
    const inputProcessingSpeed = processingSpeed * 50; // Input processing is ~50x faster (parallelized)
    const inputProcessingTime = (inputTokensActual / inputProcessingSpeed) * 1000; // ms
    
    // Full output generation time (all tokens must still be generated)
    const fullOutputTime = (outputTokensActual / processingSpeed) * 1000;
    
    // For streaming: TTFT is fast (~50-200ms), perceived latency is much lower
    // Users see tokens appearing in real-time, so they don't "wait" for the full response
    // Perceived delay = TTFT + small buffer (users start reading immediately)
    // For non-streaming: must wait for ALL tokens before any response
    const outputProcessingTime = enableStreaming ? 
        Math.min(200, Math.max(50, fullOutputTime * 0.1)) : // Streaming: 50-200ms perceived
        fullOutputTime; // Non-streaming: full generation time
    const thinkingTime = thinkingTokensActual > 0 ? (thinkingTokensActual / (processingSpeed * 0.5)) * 1000 : 0;
    const searchTime = (webSearches + fileSearches) * 200; // ~200ms per search
    
    const totalLatency = networkLatency * 2 + inputProcessingTime + outputProcessingTime + thinkingTime + searchTime;
    const timeToFirstToken = networkLatency + inputProcessingTime + (enableStreaming ? 50 : 0);
    
    let latencyStatus = 'Fast';
    let statusColor = 'var(--white)';
    if (totalLatency > 5000) {
        latencyStatus = 'Very Slow';
        statusColor = 'var(--white)';
    } else if (totalLatency > 2000) {
        latencyStatus = 'Slow';
        statusColor = 'var(--white)';
    } else if (totalLatency > 1000) {
        latencyStatus = 'Moderate';
        statusColor = 'var(--white)';
    }
    
    const details = document.getElementById('costDetails');
    details.innerHTML = `
        ${inputCost > 0 ? `<div class="cost-item"><span>Input (${inputTokens.toLocaleString()})</span><span>$${inputCost.toFixed(4)}</span></div>` : ''}
        ${outputCost > 0 ? `<div class="cost-item"><span>Output (${outputTokens.toLocaleString()})</span><span>$${outputCost.toFixed(4)}</span></div>` : ''}
        ${cacheReadCost > 0 ? `<div class="cost-item"><span>Cache Read (${cacheRead.toLocaleString()})</span><span>$${cacheReadCost.toFixed(4)}</span></div>` : ''}
        ${cacheWriteCost > 0 ? `<div class="cost-item"><span>Cache Write (${cacheWrite.toLocaleString()})</span><span>$${cacheWriteCost.toFixed(4)}</span></div>` : ''}
        ${webSearchCost > 0 ? `<div class="cost-item"><span>Web Searches (${webSearches})</span><span>$${webSearchCost.toFixed(4)}</span></div>` : ''}
        ${fileSearchCost > 0 ? `<div class="cost-item"><span>File Searches (${fileSearches})</span><span>$${fileSearchCost.toFixed(4)}</span></div>` : ''}
        ${thinkingCost > 0 ? `<div class="cost-item"><span>Thinking Tokens (${thinkingTokens.toLocaleString()})</span><span>$${thinkingCost.toFixed(4)}</span></div>` : ''}
    `;
    
    document.getElementById('totalCost').textContent = `$${total.toFixed(4)}`;
    document.getElementById('perRequestCost').textContent = `$${totalPerRequest.toFixed(4)}`;
    document.getElementById('estimatedLatency').textContent = formatLatency(totalLatency);
    document.getElementById('latencyStatus').textContent = `${latencyStatus} (${totalLatency < 1000 ? '<1s' : totalLatency < 2000 ? '1-2s' : '>2s'})`;
    
    const breakdownItems = [
        { label: 'Network (Round-trip)', value: networkLatency * 2 },
        { label: 'Input Processing', value: inputProcessingTime },
        { label: 'Output Processing', value: outputProcessingTime }
    ];
    
    if (thinkingTime > 0) {
        breakdownItems.push({ label: 'Thinking Tokens', value: thinkingTime });
    }
    
    if (searchTime > 0) {
        breakdownItems.push({ label: 'Search Operations', value: searchTime });
    }
    
    breakdownItems.push({ label: 'Time to First Token (TTFT)', value: timeToFirstToken });
    
    document.getElementById('latencyBreakdownCalc').innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 11px;">
            ${breakdownItems.map(item => `
                <div>
                    <div style="color: var(--white); margin-bottom: 4px;">${item.label}</div>
                    <div style="font-weight: 700; font-size: 14px;">${formatLatency(item.value)}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Update charts
    updateCostChart({
        input: inputCost,
        output: outputCost,
        cache: cacheReadCost + cacheWriteCost,
        search: webSearchCost + fileSearchCost,
        thinking: thinkingCost
    });
    
    updateTokenChart({
        input: inputTokens,
        output: outputTokens,
        cache: cacheRead + cacheWrite,
        thinking: thinkingTokens
    });
}

// Update cost chart
function updateCostChart(costs) {
    const chart = document.getElementById('costChart');
    const total = Object.values(costs).reduce((a, b) => a + b, 0);
    
    if (total === 0) {
        chart.innerHTML = '<div style="text-align: center;">Enter values to see chart</div>';
        return;
    }
    
    const items = Object.entries(costs).filter(([_, v]) => v > 0);
    if (items.length === 0) {
        chart.innerHTML = '<div style="text-align: center;">Enter values to see chart</div>';
        return;
    }
    
    chart.innerHTML = items.map(([label, value]) => {
        const percentage = (value / total) * 100;
        const height = (value / total) * 100;
        return `
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div style="width: 100%; height: 150px; border: 1px solid var(--white); position: relative; display: flex; align-items: flex-end;">
                    <div style="width: 100%; height: ${height}%; background: var(--white); transition: height 0.3s;"></div>
                </div>
                <div style="font-size: 10px; text-align: center;">
                    <div style="font-weight: 700;">${label.charAt(0).toUpperCase() + label.slice(1)}</div>
                    <div style="color: var(--white);">$${value.toFixed(4)}</div>
                    <div style="color: var(--white);">${percentage.toFixed(1)}%</div>
                </div>
            </div>
        `;
    }).join('');
    
    chart.style.display = 'flex';
    chart.style.gap = '12px';
}

// Update token chart
function updateTokenChart(tokens) {
    const chart = document.getElementById('tokenChart');
    const total = Object.values(tokens).reduce((a, b) => a + b, 0);
    
    if (total === 0) {
        chart.innerHTML = '<div style="text-align: center;">Enter values to see chart</div>';
        return;
    }
    
    const items = Object.entries(tokens).filter(([_, v]) => v > 0);
    if (items.length === 0) {
        chart.innerHTML = '<div style="text-align: center;">Enter values to see chart</div>';
        return;
    }
    
    chart.innerHTML = items.map(([label, value]) => {
        const percentage = (value / total) * 100;
        return `
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div style="width: 100%; height: 150px; border: 1px solid var(--white); position: relative; display: flex; align-items: flex-end;">
                    <div style="width: 100%; height: ${percentage}%; background: var(--white); transition: height 0.3s;"></div>
                </div>
                <div style="font-size: 10px; text-align: center;">
                    <div style="font-weight: 700;">${label.charAt(0).toUpperCase() + label.slice(1)}</div>
                    <div style="color: var(--white);">${value.toLocaleString()}</div>
                    <div style="color: var(--white);">${percentage.toFixed(1)}%</div>
                </div>
            </div>
        `;
    }).join('');
    
    chart.style.display = 'flex';
    chart.style.gap = '12px';
}

// Export calculation
function exportCalculation(format) {
    const modelValue = document.getElementById('calcModelSelect').value;
    if (!modelValue) return;
    
    const [provider, modelName] = modelValue.split(':');
    const data = {
        model: `${provider}:${modelName}`,
        inputTokens: parseFloat(document.getElementById('inputTokens').value) || 0,
        outputTokens: parseFloat(document.getElementById('outputTokens').value) || 0,
        cacheRead: parseFloat(document.getElementById('cacheReadTokens').value) || 0,
        cacheWrite: parseFloat(document.getElementById('cacheWriteTokens').value) || 0,
        webSearches: parseInt(document.getElementById('webSearches').value) || 0,
        fileSearches: parseInt(document.getElementById('fileSearches').value) || 0,
        thinkingTokens: parseFloat(document.getElementById('thinkingTokens').value) || 0,
        numRequests: parseInt(document.getElementById('numRequests').value) || 1,
        totalCost: document.getElementById('totalCost').textContent,
        perRequestCost: document.getElementById('perRequestCost').textContent,
        estimatedLatency: document.getElementById('estimatedLatency').textContent
    };
    
    if (format === 'csv') {
        const csv = [
            ['Field', 'Value'],
            ['Model', data.model],
            ['Input Tokens', data.inputTokens],
            ['Output Tokens', data.outputTokens],
            ['Cache Read', data.cacheRead],
            ['Cache Write', data.cacheWrite],
            ['Web Searches', data.webSearches],
            ['File Searches', data.fileSearches],
            ['Thinking Tokens', data.thinkingTokens],
            ['Number of Requests', data.numRequests],
            ['Total Cost', data.totalCost],
            ['Per Request Cost', data.perRequestCost],
            ['Estimated Latency', data.estimatedLatency]
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        
        downloadFile(csv, 'calculation.csv', 'text/csv');
    } else {
        downloadFile(JSON.stringify(data, null, 2), 'calculation.json', 'application/json');
    }
}

// Simulate request
function simulateRequest() {
    const modelValue = document.getElementById('calcModelSelect').value;
    if (!modelValue) {
        alert('Please select a model first');
        return;
    }
    
    const totalLatency = parseInt(document.getElementById('estimatedLatency').textContent) || 0;
    if (totalLatency === 0) {
        calculateCost();
        setTimeout(() => simulateRequest(), 100);
        return;
    }
    
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 2000; display: flex; align-items: center; justify-content: center;';
    
    const simDiv = document.createElement('div');
    simDiv.style.cssText = 'background: var(--black); border: 2px solid var(--white); padding: 40px; max-width: 600px; width: 90%; position: relative;';
    simDiv.innerHTML = `
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Request Simulation</h3>
        <div style="text-align: center; margin-bottom: 30px;">
            <div class="stat-value" style="font-size: 56px; margin-bottom: 8px;" id="simLatencyCalc">0 ms</div>
            <div style="font-size: 12px; color: var(--white); margin-top: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Total Request Time</div>
        </div>
        <div style="height: 8px; background: var(--black); border: 1px solid var(--white); margin-bottom: 30px; position: relative;">
            <div id="simProgressCalc" style="height: 100%; background: var(--white); width: 0%; transition: width 0.05s;"></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; font-size: 12px; margin-bottom: 30px;">
            <div style="text-align: center; border: 1px solid var(--white); padding: 16px;">
                <div style="font-weight: 600; margin-bottom: 8px; text-transform: uppercase; font-size: 11px;">Network</div>
                <div id="simNetwork" style="font-size: 24px; font-weight: 700; color: var(--white);">0 ms</div>
            </div>
            <div style="text-align: center; border: 1px solid var(--white); padding: 16px;">
                <div style="font-weight: 600; margin-bottom: 8px; text-transform: uppercase; font-size: 11px;">Processing</div>
                <div id="simProcessing" style="font-size: 24px; font-weight: 700; color: var(--white);">0 ms</div>
            </div>
            <div style="text-align: center; border: 1px solid var(--white); padding: 16px;">
                <div style="font-weight: 600; margin-bottom: 8px; text-transform: uppercase; font-size: 11px;">Response</div>
                <div id="simResponse" style="font-size: 24px; font-weight: 700; color: var(--white);">0 ms</div>
            </div>
        </div>
        <button class="btn btn-secondary" onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="width: 100%;">Close</button>
    `;
    overlay.appendChild(simDiv);
    document.body.appendChild(overlay);
    
    // Animate
    let current = 0;
    const networkLatency = parseInt(document.getElementById('networkLatency').value) || 50;
    const inputTokens = parseFloat(document.getElementById('inputTokens').value) || 0;
    const outputTokens = parseFloat(document.getElementById('outputTokens').value) || 0;
    const processingSpeed = parseInt(document.getElementById('processingSpeed').value) || 100;
    const inputTokensActual = inputTokens * 1000000000;
    const outputTokensActual = outputTokens * 1000000000;
    const inputTime = (inputTokensActual / processingSpeed) * 1000;
    const outputTime = (outputTokensActual / processingSpeed) * 1000;
    
    const interval = setInterval(() => {
        current += 10;
        const progress = Math.min((current / totalLatency) * 100, 100);
        
        document.getElementById('simProgressCalc').style.width = progress + '%';
        document.getElementById('simLatencyCalc').textContent = Math.min(current, totalLatency) + ' ms';
        
        if (current <= networkLatency) {
            document.getElementById('simNetwork').textContent = current + ' ms';
            document.getElementById('simProcessing').textContent = '0 ms';
            document.getElementById('simResponse').textContent = '0 ms';
        } else if (current <= networkLatency + inputTime) {
            document.getElementById('simNetwork').textContent = networkLatency + ' ms';
            document.getElementById('simProcessing').textContent = (current - networkLatency) + ' ms';
            document.getElementById('simResponse').textContent = '0 ms';
        } else {
            document.getElementById('simNetwork').textContent = networkLatency + ' ms';
            document.getElementById('simProcessing').textContent = Math.round(inputTime) + ' ms';
            document.getElementById('simResponse').textContent = (current - networkLatency - inputTime) + ' ms';
        }
        
        if (current >= totalLatency) {
            clearInterval(interval);
        }
    }, 10);
}

// Select model for calculator
function selectModelForCalc(modelValue) {
    document.getElementById('calcModelSelect').value = modelValue;
    document.querySelector('[data-tab="calculator"]').click();
    calculateCost();
}

// Compare models with latency
function compareModels() {
    const model1Value = document.getElementById('compareModel1').value;
    const model2Value = document.getElementById('compareModel2').value;
    const result = document.getElementById('comparisonResult');
    const chartsDiv = document.getElementById('comparisonCharts');
    
    if (!model1Value || !model2Value) {
        result.innerHTML = '<p class="placeholder">Select two models to compare</p>';
        chartsDiv.style.display = 'none';
        return;
    }
    
    const [provider1, name1] = model1Value.split(':');
    const [provider2, name2] = model2Value.split(':');
    
    const model1 = allModels.find(m => m.provider === provider1 && m.name === name1);
    const model2 = allModels.find(m => m.provider === provider2 && m.name === name2);
    
    if (!model1 || !model2) return;
    
    const inputTokens = parseFloat(document.getElementById('compareInputTokens')?.value) || 0.000001;
    const outputTokens = parseFloat(document.getElementById('compareOutputTokens')?.value) || 0.0000005;
    const numRequests = parseInt(document.getElementById('compareNumRequests')?.value || 100);
    const processingSpeed = parseInt(document.getElementById('compareProcessingSpeed')?.value || 100);
    
    // Calculate costs
    const payg1 = model1.pricing?.pay_as_you_go || {};
    const payg2 = model2.pricing?.pay_as_you_go || {};
    
    // Tokens are in billions, prices per billion
    // cents/token / 100 = $/token * 1,000,000,000 = $/billion
    const inputPrice1PerBillion = (payg1.request_token?.price || 0) / 100 * 1000000000;
    const outputPrice1PerBillion = (payg1.response_token?.price || 0) / 100 * 1000000000;
    const inputPrice2PerBillion = (payg2.request_token?.price || 0) / 100 * 1000000000;
    const outputPrice2PerBillion = (payg2.response_token?.price || 0) / 100 * 1000000000;
    
    const cost1Input = inputTokens * inputPrice1PerBillion;
    const cost1Output = outputTokens * outputPrice1PerBillion;
    const cost1PerRequest = cost1Input + cost1Output;
    const cost1Total = cost1PerRequest * numRequests;
    
    const cost2Input = inputTokens * inputPrice2PerBillion;
    const cost2Output = outputTokens * outputPrice2PerBillion;
    const cost2PerRequest = cost2Input + cost2Output;
    const cost2Total = cost2PerRequest * numRequests;
    
    // Calculate latency (tokens in billions, convert to actual tokens)
    const inputTokensActual = inputTokens * 1000000000;
    const outputTokensActual = outputTokens * 1000000000;
    
    // Get model-specific processing speeds
    const speed1 = getModelProcessingSpeed(model1.name);
    const speed2 = getModelProcessingSpeed(model2.name);
    
    // Input processing is ~50x faster than output due to parallelization
    const latency1Input = (inputTokensActual / (speed1 * 50)) * 1000;
    const latency1Output = (outputTokensActual / speed1) * 1000;
    // Use network latency from main calculator, or default to 50ms
    const networkLatency = parseInt(document.getElementById('networkLatency')?.value || 50);
    const latency1Total = (networkLatency * 2) + latency1Input + latency1Output;
    
    const latency2Input = (inputTokensActual / (speed2 * 50)) * 1000;
    const latency2Output = (outputTokensActual / speed2) * 1000;
    const latency2Total = (networkLatency * 2) + latency2Input + latency2Output;
    
    const savings = cost1Total > cost2Total ? cost1Total - cost2Total : cost2Total - cost1Total;
    const cheaperModel = cost1Total < cost2Total ? model1.name : model2.name;
    const fasterModel = latency1Total < latency2Total ? model1.name : model2.name;
    
    result.innerHTML = `
        <div class="comparison-card">
            <h3>${model1.name}</h3>
            <div class="comparison-item"><span>Provider</span><span>${model1.provider}</span></div>
            <div class="comparison-item"><span>Type</span><span>${model1.type}</span></div>
            <div class="comparison-item"><span>Input Price</span><span>$${formatPrice(getInputPrice(model1))}/1B tokens</span></div>
            <div class="comparison-item"><span>Output Price</span><span>$${formatPrice(getOutputPrice(model1))}/1B tokens</span></div>
            <div class="comparison-item"><span>Context Window</span><span>${model1.maxTokens ? formatNumber(model1.maxTokens) + ' tokens' : 'N/A'}</span></div>
            <div class="comparison-item"><span>Cost Per Request</span><span style="font-weight: 700;">$${cost1PerRequest.toFixed(4)}</span></div>
            <div class="comparison-item"><span>Total Cost (${numRequests} req)</span><span style="font-weight: 700;">$${cost1Total.toFixed(4)}</span></div>
            <div class="comparison-item"><span>Estimated Latency</span><span style="font-weight: 700;">${Math.round(latency1Total)} ms</span></div>
            <div class="comparison-item"><span>Features</span><span>${model1.supported.join(', ') || 'None'}</span></div>
        </div>
        <div class="comparison-card">
            <h3>${model2.name}</h3>
            <div class="comparison-item"><span>Provider</span><span>${model2.provider}</span></div>
            <div class="comparison-item"><span>Type</span><span>${model2.type}</span></div>
            <div class="comparison-item"><span>Input Price</span><span>$${formatPrice(getInputPrice(model2))}/1B tokens</span></div>
            <div class="comparison-item"><span>Output Price</span><span>$${formatPrice(getOutputPrice(model2))}/1B tokens</span></div>
            <div class="comparison-item"><span>Context Window</span><span>${model2.maxTokens ? formatNumber(model2.maxTokens) + ' tokens' : 'N/A'}</span></div>
            <div class="comparison-item"><span>Cost Per Request</span><span style="font-weight: 700;">$${cost2PerRequest.toFixed(4)}</span></div>
            <div class="comparison-item"><span>Total Cost (${numRequests} req)</span><span style="font-weight: 700;">$${cost2Total.toFixed(4)}</span></div>
            <div class="comparison-item"><span>Estimated Latency</span><span style="font-weight: 700;">${Math.round(latency2Total)} ms</span></div>
            <div class="comparison-item"><span>Features</span><span>${model2.supported.join(', ') || 'None'}</span></div>
        </div>
        <div class="stat-card" style="margin-top: 20px; border: 1px solid var(--white); padding: 24px; text-align: center;">
            <h3 style="margin-bottom: 16px; font-size: 12px;">Comparison Summary</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                <div>
                    <div style="font-size: 11px; color: var(--white); margin-bottom: 8px;">Cheaper Model</div>
                    <div style="font-size: 18px; font-weight: 700;">${cheaperModel}</div>
                    <div style="font-size: 11px; color: var(--white); margin-top: 4px;">Saves $${savings.toFixed(4)}</div>
                </div>
                <div>
                    <div style="font-size: 11px; color: var(--white); margin-bottom: 8px;">Faster Model</div>
                    <div style="font-size: 18px; font-weight: 700;">${fasterModel}</div>
                    <div style="font-size: 11px; color: var(--white); margin-top: 4px;">${Math.abs(latency1Total - latency2Total).toFixed(0)} ms faster</div>
                </div>
            </div>
        </div>
    `;
    
    // Update charts
    chartsDiv.style.display = 'block';
    updateCompareCostChart(cost1Total, cost2Total, model1.name, model2.name);
    updateCompareLatencyChart(latency1Total, latency2Total, model1.name, model2.name);
}

// Update compare cost chart
function updateCompareCostChart(cost1, cost2, name1, name2) {
    const chart = document.getElementById('compareCostChart');
    const maxCost = Math.max(cost1, cost2);
    const height1 = (cost1 / maxCost) * 100;
    const height2 = (cost2 / maxCost) * 100;
    
    chart.innerHTML = `
        <div style="display: flex; gap: 20px; height: 150px; align-items: flex-end;">
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div style="width: 100%; height: 150px; border: 1px solid var(--white); position: relative; display: flex; align-items: flex-end;">
                    <div style="width: 100%; height: ${height1}%; background: var(--white);"></div>
                </div>
                <div style="font-size: 10px; text-align: center;">
                    <div style="font-weight: 700;">${name1}</div>
                    <div style="color: var(--white);">$${cost1.toFixed(4)}</div>
                </div>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div style="width: 100%; height: 150px; border: 1px solid var(--white); position: relative; display: flex; align-items: flex-end;">
                    <div style="width: 100%; height: ${height2}%; background: var(--white);"></div>
                </div>
                <div style="font-size: 10px; text-align: center;">
                    <div style="font-weight: 700;">${name2}</div>
                    <div style="color: var(--white);">$${cost2.toFixed(4)}</div>
                </div>
            </div>
        </div>
    `;
}

// Update compare latency chart
function updateCompareLatencyChart(latency1, latency2, name1, name2) {
    const chart = document.getElementById('compareLatencyChart');
    const maxLatency = Math.max(latency1, latency2);
    const height1 = (latency1 / maxLatency) * 100;
    const height2 = (latency2 / maxLatency) * 100;
    
    chart.innerHTML = `
        <div style="display: flex; gap: 20px; height: 150px; align-items: flex-end;">
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div style="width: 100%; height: 150px; border: 1px solid var(--white); position: relative; display: flex; align-items: flex-end;">
                    <div style="width: 100%; height: ${height1}%; background: var(--white);"></div>
                </div>
                <div style="font-size: 10px; text-align: center;">
                    <div style="font-weight: 700;">${name1}</div>
                    <div style="color: var(--white);">${Math.round(latency1)} ms</div>
                </div>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div style="width: 100%; height: 150px; border: 1px solid var(--white); position: relative; display: flex; align-items: flex-end;">
                    <div style="width: 100%; height: ${height2}%; background: var(--white);"></div>
                </div>
                <div style="font-size: 10px; text-align: center;">
                    <div style="font-weight: 700;">${name2}</div>
                    <div style="color: var(--white);">${Math.round(latency2)} ms</div>
                </div>
            </div>
        </div>
    `;
}

// Favorites
function toggleFavorite(modelKey) {
    const index = favorites.indexOf(modelKey);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(modelKey);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderModels();
    renderFavorites();
}

function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    document.getElementById('favoritesCount').textContent = `${favorites.length} favorites`;
    
    if (favorites.length === 0) {
        grid.innerHTML = '<p class="placeholder">No favorites yet</p>';
        return;
    }
    
    const favoriteModels = favorites.map(key => {
        const [provider, name] = key.split(':');
        return allModels.find(m => m.provider === provider && m.name === name);
    }).filter(m => m);
    
    grid.innerHTML = favoriteModels.map(model => createModelCard(model)).join('');
}

function clearFavorites() {
    if (confirm('Clear all favorites?')) {
        favorites = [];
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
    }
}

function exportFavorites() {
    const favoriteModels = favorites.map(key => {
        const [provider, name] = key.split(':');
        return allModels.find(m => m.provider === provider && m.name === name);
    }).filter(m => m);
    
    exportModels('json', favoriteModels);
}

// Statistics
function updateStatistics() {
    document.getElementById('statTotalModels').textContent = allModels.length;
    document.getElementById('statProviders').textContent = new Set(allModels.map(m => m.provider)).size;
    
    const inputPrices = allModels.map(m => getInputPrice(m)).filter(p => p > 0);
    const outputPrices = allModels.map(m => getOutputPrice(m)).filter(p => p > 0);
    
    const avgInput = inputPrices.length > 0 ? inputPrices.reduce((a, b) => a + b, 0) / inputPrices.length : 0;
    const avgOutput = outputPrices.length > 0 ? outputPrices.reduce((a, b) => a + b, 0) / outputPrices.length : 0;
    
    document.getElementById('statAvgInput').textContent = `$${formatPrice(avgInput)}`;
    document.getElementById('statAvgOutput').textContent = `$${formatPrice(avgOutput)}`;
    
    const cheapest = allModels.reduce((min, m) => {
        const price = getInputPrice(m);
        return price > 0 && (getInputPrice(min) === 0 || price < getInputPrice(min)) ? m : min;
    }, allModels[0]);
    
    const expensive = allModels.reduce((max, m) => {
        const price = getInputPrice(m);
        return price > getInputPrice(max) ? m : max;
    }, allModels[0]);
    
    if (cheapest) {
        document.getElementById('statCheapest').textContent = cheapest.name;
        document.getElementById('statCheapestPrice').textContent = `$${formatPrice(getInputPrice(cheapest))}/1B tokens`;
    }
    
    if (expensive) {
        document.getElementById('statExpensive').textContent = expensive.name;
        document.getElementById('statExpensivePrice').textContent = `$${formatPrice(getInputPrice(expensive))}/1B tokens`;
    }
    
    // Provider table
    const providerStats = {};
    allModels.forEach(model => {
        if (!providerStats[model.provider]) {
            providerStats[model.provider] = {
                count: 0,
                inputPrices: [],
                outputPrices: [],
                types: new Set()
            };
        }
        providerStats[model.provider].count++;
        const inputPrice = getInputPrice(model);
        const outputPrice = getOutputPrice(model);
        if (inputPrice > 0) providerStats[model.provider].inputPrices.push(inputPrice);
        if (outputPrice > 0) providerStats[model.provider].outputPrices.push(outputPrice);
        providerStats[model.provider].types.add(model.type);
    });
    
    const tbody = document.getElementById('providerTableBody');
    tbody.innerHTML = Object.entries(providerStats)
        .sort((a, b) => b[1].count - a[1].count)
        .map(([provider, stats]) => {
            const avgInput = stats.inputPrices.length > 0 
                ? stats.inputPrices.reduce((a, b) => a + b, 0) / stats.inputPrices.length 
                : 0;
            const avgOutput = stats.outputPrices.length > 0 
                ? stats.outputPrices.reduce((a, b) => a + b, 0) / stats.outputPrices.length 
                : 0;
            
            return `
                <tr>
                    <td>${provider}</td>
                    <td>${stats.count}</td>
                    <td>$${formatPrice(avgInput)}/1B</td>
                    <td>$${formatPrice(avgOutput)}/1B</td>
                    <td>${Array.from(stats.types).join(', ')}</td>
                </tr>
            `;
        }).join('');
}

// Export
function exportModels(format, modelsToExport = null) {
    const models = modelsToExport || allModels.filter(m => {
        if (currentFilters.searchTerm && !m.name.toLowerCase().includes(currentFilters.searchTerm) && 
            !m.provider.toLowerCase().includes(currentFilters.searchTerm)) return false;
        if (currentFilters.providerFilter && m.provider !== currentFilters.providerFilter) return false;
        if (currentFilters.typeFilter && m.type !== currentFilters.typeFilter) return false;
        if (currentFilters.featureFilter && !m.supported.includes(currentFilters.featureFilter)) return false;
        const inputPricePerMillion = (getInputPrice(m) / 100) * 1000; // Convert to $/million
        if (inputPricePerMillion > currentFilters.maxPrice) return false;
        return true;
    });
    
    if (format === 'csv') {
        const headers = ['Provider', 'Model', 'Type', 'Input Price ($/1B tokens)', 'Output Price ($/1B tokens)', 'Context Window (tokens)', 'Features'];
        const rows = models.map(m => [
            m.provider,
            m.name,
            m.type,
            formatPrice(getInputPrice(m)),
            formatPrice(getOutputPrice(m)),
            m.maxTokens ? formatNumber(m.maxTokens) : 'N/A',
            m.supported.join('; ')
        ]);
        
        const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        downloadFile(csv, 'models.csv', 'text/csv');
    } else {
        const json = JSON.stringify(models.map(m => ({
            provider: m.provider,
            name: m.name,
            type: m.type,
            inputPrice: formatPrice(getInputPrice(m)) + '/1B tokens',
            outputPrice: formatPrice(getOutputPrice(m)) + '/1B tokens',
            contextWindow: m.maxTokens ? formatNumber(m.maxTokens) + ' tokens' : 'N/A',
            features: m.supported
        })), null, 2);
        downloadFile(json, 'models.json', 'application/json');
    }
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function clearFilters() {
    document.getElementById('modelSearch').value = '';
    document.getElementById('providerFilter').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('featureFilter').value = '';
    document.getElementById('maxPriceFilter').value = '';
    const exportCSVBtn = document.getElementById('exportCSVBtn');
    const exportJSONBtn = document.getElementById('exportJSONBtn');
    if (exportCSVBtn) exportCSVBtn.disabled = true;
    if (exportJSONBtn) exportJSONBtn.disabled = true;
    renderModels();
}

// Batch calculator
function calculateBatch() {
    const input = document.getElementById('batchInput').value;
    const resultsDiv = document.getElementById('batchResults');
    const chartsDiv = document.getElementById('batchCharts');
    
    try {
        const batch = JSON.parse(input);
        if (!Array.isArray(batch)) {
            throw new Error('Input must be an array');
        }
        
        let totalCost = 0;
        let totalInputTokens = 0;
        let totalOutputTokens = 0;
        const results = batch.map(item => {
            const [provider, name] = item.model.split(':');
            const model = allModels.find(m => m.provider === provider && m.name === name);
            if (!model) return null;
            
            const inputTokens = item.input || 0;
            const outputTokens = item.output || 0;
            const payg = model.pricing?.pay_as_you_go || {};
            
            // Tokens are in billions, prices per billion
            // cents/token / 100 = $/token * 1,000,000,000 = $/billion
            const inputPricePerBillion = (payg.request_token?.price || 0) / 100 * 1000000000;
            const outputPricePerBillion = (payg.response_token?.price || 0) / 100 * 1000000000;
            const cost = (inputTokens * inputPricePerBillion) + (outputTokens * outputPricePerBillion);
            
            totalCost += cost;
            totalInputTokens += inputTokens;
            totalOutputTokens += outputTokens;
            
            return { 
                model: item.model, 
                modelName: name,
                provider: provider,
                cost, 
                inputTokens, 
                outputTokens,
                costPerToken: cost / (inputTokens + outputTokens)
            };
        }).filter(r => r !== null);
        
        if (results.length === 0) {
            resultsDiv.innerHTML = '<div class="placeholder" style="color: var(--white);">No valid models found in batch</div>';
            chartsDiv.style.display = 'none';
            return;
        }
        
        // Sort by cost
        results.sort((a, b) => b.cost - a.cost);
        
        resultsDiv.innerHTML = `
            <div class="stat-card" style="margin-bottom: 20px; border: 2px solid var(--white); padding: 24px; text-align: center;">
                <h3 style="margin-bottom: 16px; font-size: 12px;">Batch Summary</h3>
                <div class="stat-value" style="font-size: 42px; margin-bottom: 8px;">$${totalCost.toFixed(4)}</div>
                <div class="stat-label" style="margin-bottom: 16px;">Total Cost for ${results.length} requests</div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--white);">
                    <div>
                        <div style="font-size: 11px; color: var(--white); margin-bottom: 4px;">Total Input</div>
                        <div style="font-size: 18px; font-weight: 700;">${totalInputTokens.toLocaleString()}</div>
                    </div>
                    <div>
                        <div style="font-size: 11px; color: var(--white); margin-bottom: 4px;">Total Output</div>
                        <div style="font-size: 18px; font-weight: 700;">${totalOutputTokens.toLocaleString()}</div>
                    </div>
                    <div>
                        <div style="font-size: 11px; color: var(--white); margin-bottom: 4px;">Avg Cost/Req</div>
                        <div style="font-size: 18px; font-weight: 700;">$${(totalCost / results.length).toFixed(4)}</div>
                    </div>
                </div>
            </div>
            <div style="max-height: 500px; overflow-y: auto;">
                ${results.map((r, idx) => `
                    <div class="batch-result-item" style="border: 2px solid var(--white); margin-bottom: 12px; position: relative;">
                        <div style="position: absolute; top: 8px; right: 8px; font-size: 10px; padding: 4px 8px; background: var(--black); border: 1px solid var(--white);">
                            #${idx + 1}
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-right: 60px;">
                            <div>
                                <strong style="font-size: 14px;">${r.modelName}</strong>
                                <div style="font-size: 11px; color: var(--white); margin-top: 4px;">${r.provider}</div>
                            </div>
                            <div style="text-align: right;">
                                <strong style="font-size: 18px;">$${r.cost.toFixed(4)}</strong>
                                <div style="font-size: 10px; color: var(--white); margin-top: 4px;">${((r.cost / totalCost) * 100).toFixed(1)}% of total</div>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding-top: 12px; border-top: 1px solid var(--white); font-size: 11px;">
                            <div>
                                <div style="color: var(--white); margin-bottom: 4px;">Input Tokens</div>
                                <div style="font-weight: 700;">${r.inputTokens.toLocaleString()}</div>
                            </div>
                            <div>
                                <div style="color: var(--white); margin-bottom: 4px;">Output Tokens</div>
                                <div style="font-weight: 700;">${r.outputTokens.toLocaleString()}</div>
                            </div>
                            <div>
                                <div style="color: var(--white); margin-bottom: 4px;">Cost/Token</div>
                                <div style="font-weight: 700;">$${r.costPerToken.toFixed(8)}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top: 20px; display: flex; gap: 12px;">
                <button class="btn" onclick="exportBatchResults('csv')">Export CSV</button>
                <button class="btn" onclick="exportBatchResults('json')">Export JSON</button>
            </div>
        `;
        
        // Update charts
        chartsDiv.style.display = 'block';
        updateBatchCostChart(results, totalCost);
        updateBatchModelChart(results);
    } catch (error) {
        resultsDiv.innerHTML = `<div class="placeholder" style="color: var(--white); padding: 40px;">Error: ${error.message}<br><br>Please check your JSON format.</div>`;
        chartsDiv.style.display = 'none';
    }
}

// Update batch cost chart
function updateBatchCostChart(results, totalCost) {
    const chart = document.getElementById('batchCostChart');
    const maxCost = Math.max(...results.map(r => r.cost));
    
    chart.innerHTML = `
        <div style="display: flex; gap: 12px; height: 250px; align-items: flex-end;">
            ${results.map(r => {
                const height = (r.cost / maxCost) * 100;
                return `
                    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                        <div style="width: 100%; height: 250px; border: 2px solid var(--white); position: relative; display: flex; align-items: flex-end;">
                            <div style="width: 100%; height: ${height}%; background: var(--white); transition: height 0.3s;"></div>
                        </div>
                        <div style="font-size: 10px; text-align: center; max-width: 100px;">
                            <div style="font-weight: 700; margin-bottom: 4px;">${r.modelName.substring(0, 15)}</div>
                            <div style="color: var(--white);">$${r.cost.toFixed(4)}</div>
                            <div style="color: var(--white);">${((r.cost / totalCost) * 100).toFixed(1)}%</div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Update batch model chart
function updateBatchModelChart(results) {
    const chart = document.getElementById('batchModelChart');
    const modelGroups = {};
    
    results.forEach(r => {
        if (!modelGroups[r.provider]) {
            modelGroups[r.provider] = { cost: 0, count: 0 };
        }
        modelGroups[r.provider].cost += r.cost;
        modelGroups[r.provider].count += 1;
    });
    
    const items = Object.entries(modelGroups);
    const maxCost = Math.max(...items.map(([_, v]) => v.cost));
    
    chart.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px;">
            ${items.map(([provider, data]) => {
                const width = (data.cost / maxCost) * 100;
                return `
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px;">
                            <span style="font-weight: 700;">${provider}</span>
                            <span style="color: var(--white);">$${data.cost.toFixed(4)} (${data.count} models)</span>
                        </div>
                        <div style="height: 24px; border: 2px solid var(--white); position: relative; overflow: hidden;">
                            <div style="position: absolute; left: 0; top: 0; height: 100%; width: ${width}%; background: var(--white); transition: width 0.3s;"></div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Load batch template
function loadBatchTemplate(type) {
    const templates = {
        comparison: `[
    {"model": "openai:gpt-4o", "input": 1000, "output": 500},
    {"model": "anthropic:claude-3-5-sonnet-20241022", "input": 1000, "output": 500},
    {"model": "google:gemini-1.5-pro", "input": 1000, "output": 500}
]`,
        monthly: `[
    {"model": "openai:gpt-4o", "input": 50000, "output": 25000},
    {"model": "openai:gpt-4o-mini", "input": 200000, "output": 100000},
    {"model": "anthropic:claude-3-5-haiku-20241022", "input": 100000, "output": 50000}
]`,
        scenario: `[
    {"model": "openai:gpt-4o", "input": 5000, "output": 2000},
    {"model": "openai:gpt-4o-mini", "input": 5000, "output": 2000},
    {"model": "anthropic:claude-3-5-haiku-20241022", "input": 5000, "output": 2000}
]`
    };
    
    document.getElementById('batchInput').value = templates[type] || '';
}

// Export batch results
function exportBatchResults(format) {
    const resultsDiv = document.getElementById('batchResults');
    const results = Array.from(resultsDiv.querySelectorAll('.batch-result-item')).map(item => {
        const modelName = item.querySelector('strong').textContent;
        const cost = parseFloat(item.querySelector('strong:last-of-type').textContent.replace('$', ''));
        const tokens = item.textContent.match(/Input Tokens\s+(\d+[\d,]*)/);
        const outputTokens = item.textContent.match(/Output Tokens\s+(\d+[\d,]*)/);
        return {
            model: modelName,
            cost: cost,
            inputTokens: tokens ? parseInt(tokens[1].replace(/,/g, '')) : 0,
            outputTokens: outputTokens ? parseInt(outputTokens[1].replace(/,/g, '')) : 0
        };
    });
    
    if (format === 'csv') {
        const csv = [
            ['Model', 'Cost ($)', 'Input Tokens', 'Output Tokens'],
            ...results.map(r => [r.model, r.cost, r.inputTokens, r.outputTokens])
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        downloadFile(csv, 'batch-results.csv', 'text/csv');
    } else {
        downloadFile(JSON.stringify(results, null, 2), 'batch-results.json', 'application/json');
    }
}

// Optimizer
function optimizeModel() {
    const useCase = document.getElementById('useCaseSelect').value;
    // Input is in billions (e.g., 0.01 = 10M tokens monthly)
    const inputTokensBillion = parseFloat(document.getElementById('optInputTokens').value) || 0.01;
    const outputTokensBillion = parseFloat(document.getElementById('optOutputTokens').value) || 0.005;
    const monthlyRequests = parseInt(document.getElementById('optMonthlyRequests').value) || 10000;
    const maxBudget = parseFloat(document.getElementById('optMaxBudget').value) || 100;
    
    const requireTools = document.getElementById('optFeatureTools').checked;
    const requireImage = document.getElementById('optFeatureImage').checked;
    const requireCache = document.getElementById('optFeatureCache').checked;
    
    let candidates = allModels.filter(m => {
        if (requireTools && !m.supported.includes('tools')) return false;
        if (requireImage && !m.supported.includes('image')) return false;
        if (requireCache && !m.supported.includes('cache_control')) return false;
        return true;
    });
    
    // Filter by use case
    if (useCase === 'long') {
        candidates = candidates.filter(m => m.maxTokens && m.maxTokens >= 32000);
    } else if (useCase === 'embedding') {
        candidates = candidates.filter(m => m.type === 'embedding');
    } else if (useCase === 'image') {
        candidates = candidates.filter(m => m.supported.includes('image'));
    } else if (useCase === 'cheap') {
        // Prioritize cheaper models
        candidates = candidates.sort((a, b) => {
            const priceA = getInputPrice(a) + getOutputPrice(a);
            const priceB = getInputPrice(b) + getOutputPrice(b);
            return priceA - priceB;
        });
    }
    
    // Calculate costs
    const scored = candidates.map(model => {
        const inputPrice = getInputPrice(model);
        const outputPrice = getOutputPrice(model);
        // Prices are in cents/token, convert to $/billion tokens
        const inputPricePerBillion = (inputPrice / 100) * 1000000000;
        const outputPricePerBillion = (outputPrice / 100) * 1000000000;
        // Monthly cost = tokens in billions × price per billion
        const monthlyCost = (inputTokensBillion * inputPricePerBillion) + (outputTokensBillion * outputPricePerBillion);
        const costPerRequest = monthlyCost / monthlyRequests;
        
        // Calculate latency estimate per request
        // Convert monthly totals to per-request tokens
        const inputTokensPerRequest = (inputTokensBillion * 1000000000) / monthlyRequests;
        const outputTokensPerRequest = (outputTokensBillion * 1000000000) / monthlyRequests;
        
        // Get model-specific processing speed
        const processingSpeed = getModelProcessingSpeed(model.name);
        
        // Use network latency from main calculator, or default to 50ms
        const networkLatency = parseInt(document.getElementById('networkLatency')?.value || 50);
        const inputProcessingTime = (inputTokensPerRequest / (processingSpeed * 50)) * 1000; // Input is parallelized
        const outputProcessingTime = (outputTokensPerRequest / processingSpeed) * 1000;
        const latency = (networkLatency * 2) + inputProcessingTime + outputProcessingTime;
        
        return {
            model,
            costPerRequest,
            monthlyCost,
            inputPrice,
            outputPrice,
            latency,
            score: useCase === 'cheap' ? -monthlyCost : (monthlyCost > 0 ? (1 / monthlyCost) * 1000 : 999999) // Higher score = better
        };
    }).filter(m => m.monthlyCost <= maxBudget).sort((a, b) => b.score - a.score);
    
    const resultsDiv = document.getElementById('optimizerResults');
    const chartsDiv = document.getElementById('optimizerCharts');
    
    if (scored.length === 0) {
        resultsDiv.innerHTML = '<div class="placeholder" style="padding: 40px; text-align: center;">No models match your criteria. Try adjusting your budget or requirements.</div>';
        chartsDiv.style.display = 'none';
        return;
    }
    
    const top5 = scored.slice(0, 5);
    const cheapest = top5[0];
    const mostExpensive = top5[top5.length - 1];
    const savings = mostExpensive ? mostExpensive.monthlyCost - cheapest.monthlyCost : 0;
    
    resultsDiv.innerHTML = `
        <div class="stat-card" style="margin-bottom: 20px; border: 2px solid var(--white); padding: 24px; text-align: center;">
            <h3 style="margin-bottom: 16px; font-size: 12px;">Best Match</h3>
            <div class="stat-value" style="font-size: 32px; margin-bottom: 8px;">${cheapest.model.name}</div>
            <div class="stat-label" style="margin-bottom: 16px;">${cheapest.model.provider}</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--white);">
                <div>
                    <div style="font-size: 11px; color: var(--white); margin-bottom: 4px;">Monthly Cost</div>
                    <div style="font-size: 18px; font-weight: 700;">$${cheapest.monthlyCost.toFixed(2)}</div>
                </div>
                <div>
                    <div style="font-size: 11px; color: var(--white); margin-bottom: 4px;">Per Request</div>
                    <div style="font-size: 18px; font-weight: 700;">$${cheapest.costPerRequest.toFixed(4)}</div>
                </div>
                <div>
                    <div style="font-size: 11px; color: var(--white); margin-bottom: 4px;">Est. Latency</div>
                    <div style="font-size: 18px; font-weight: 700;">${Math.round(cheapest.latency)} ms</div>
                </div>
            </div>
        </div>
        <div style="margin-bottom: 20px;">
            <div style="font-size: 12px; font-weight: 600; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Top 5 Recommendations</div>
            ${top5.map((item, idx) => `
                <div class="batch-result-item" style="border: 2px solid var(--white); margin-bottom: 12px; cursor: pointer;" onclick="selectModelForCalc('${item.model.provider}:${item.model.name}')">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                        <div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 10px; padding: 4px 8px; background: var(--black); border: 1px solid var(--white);">#${idx + 1}</span>
                                <strong style="font-size: 14px;">${item.model.name}</strong>
                            </div>
                            <div style="font-size: 11px; color: var(--white); margin-top: 4px;">${item.model.provider} • ${item.model.type}</div>
                        </div>
                        <div style="text-align: right;">
                            <strong style="font-size: 18px;">$${item.monthlyCost.toFixed(2)}</strong>
                            <div style="font-size: 10px; color: var(--white); margin-top: 4px;">/month</div>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding-top: 12px; border-top: 1px solid var(--white); font-size: 11px;">
                        <div>
                            <div style="color: var(--white); margin-bottom: 4px;">Per Request</div>
                            <div style="font-weight: 700;">$${item.costPerRequest.toFixed(4)}</div>
                        </div>
                        <div>
                            <div style="color: var(--white); margin-bottom: 4px;">Latency</div>
                            <div style="font-weight: 700;">${Math.round(item.latency)} ms</div>
                        </div>
                        <div>
                            <div style="color: var(--white); margin-bottom: 4px;">Input Price</div>
                            <div style="font-weight: 700;">$${formatPrice(item.inputPrice)}/1B</div>
                        </div>
                        <div>
                            <div style="color: var(--white); margin-bottom: 4px;">Output Price</div>
                            <div style="font-weight: 700;">$${formatPrice(item.outputPrice)}/1B</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        ${savings > 0 ? `
            <div class="stat-card" style="border: 2px solid var(--white); padding: 20px; text-align: center;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Potential Savings</div>
                <div style="font-size: 24px; font-weight: 700; margin-bottom: 4px;">$${savings.toFixed(2)}/month</div>
                <div style="font-size: 11px; color: var(--white);">By choosing the cheapest option</div>
            </div>
        ` : ''}
    `;
    
    // Update charts
    chartsDiv.style.display = 'block';
    updateOptimizerCostChart(top5);
    updateOptimizerSavingsChart(top5, cheapest);
}

// Update optimizer cost chart
function updateOptimizerCostChart(recommendations) {
    const chart = document.getElementById('optimizerCostChart');
    const maxCost = Math.max(...recommendations.map(r => r.monthlyCost));
    
    chart.innerHTML = `
        <div style="display: flex; gap: 12px; height: 250px; align-items: flex-end;">
            ${recommendations.map(r => {
                const height = (r.monthlyCost / maxCost) * 100;
                return `
                    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                        <div style="width: 100%; height: 250px; border: 2px solid var(--white); position: relative; display: flex; align-items: flex-end;">
                            <div style="width: 100%; height: ${height}%; background: var(--white); transition: height 0.3s;"></div>
                        </div>
                        <div style="font-size: 10px; text-align: center; max-width: 100px;">
                            <div style="font-weight: 700; margin-bottom: 4px;">${r.model.name.substring(0, 15)}</div>
                            <div style="color: var(--white);">$${r.monthlyCost.toFixed(2)}</div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Update optimizer savings chart
function updateOptimizerSavingsChart(recommendations, cheapest) {
    const chart = document.getElementById('optimizerSavingsChart');
    const savings = recommendations.map(r => ({
        model: r.model.name,
        savings: r.monthlyCost - cheapest.monthlyCost,
        percentage: ((r.monthlyCost - cheapest.monthlyCost) / cheapest.monthlyCost) * 100
    }));
    
    const maxSavings = Math.max(...savings.map(s => s.savings));
    
    chart.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px;">
            ${savings.map(s => {
                const width = maxSavings > 0 ? (s.savings / maxSavings) * 100 : 0;
                return `
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px;">
                            <span style="font-weight: 700;">${s.model.substring(0, 20)}</span>
                            <span style="color: var(--white);">+$${s.savings.toFixed(2)} (${s.percentage.toFixed(1)}%)</span>
                        </div>
                        <div style="height: 24px; border: 2px solid var(--white); position: relative; overflow: hidden;">
                            <div style="position: absolute; left: 0; top: 0; height: 100%; width: ${width}%; background: var(--white); transition: width 0.3s;"></div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Model detail
function showModelDetail(provider, name) {
    const model = allModels.find(m => m.provider === provider && m.name === name);
    if (!model) return;
    
    const modal = document.getElementById('modelDetailModal');
    document.getElementById('detailModelName').textContent = model.name;
    document.getElementById('detailProvider').textContent = model.provider;
    
    const payg = model.pricing?.pay_as_you_go || {};
    
    document.getElementById('modelDetailContent').innerHTML = `
        <div class="model-detail-section">
            <h3>Pricing (per 1 billion tokens)</h3>
            <div class="detail-item"><span>Input Token</span><span>$${formatPrice(payg.request_token?.price || 0)}/1B tokens</span></div>
            <div class="detail-item"><span>Output Token</span><span>$${formatPrice(payg.response_token?.price || 0)}/1B tokens</span></div>
            <div class="detail-item"><span>Cache Read</span><span>$${formatPrice(payg.cache_read_input_token?.price || 0)}/1B tokens</span></div>
            <div class="detail-item"><span>Cache Write</span><span>$${formatPrice(payg.cache_write_input_token?.price || 0)}/1B tokens</span></div>
        </div>
        <div class="model-detail-section">
            <h3>Configuration</h3>
            <div class="detail-item"><span>Type</span><span>${model.type}</span></div>
            <div class="detail-item"><span>Context Window</span><span>${model.maxTokens ? formatNumber(model.maxTokens) + ' tokens' : 'N/A'}</span></div>
            <div class="detail-item"><span>Features</span><span>${model.supported.join(', ') || 'None'}</span></div>
        </div>
        ${model.params && model.params.length > 0 ? `
        <div class="model-detail-section">
            <h3>Parameters</h3>
            ${model.params.slice(0, 10).map(p => `
                <div class="detail-item">
                    <span>${p.key || p.name || 'N/A'}</span>
                    <span>${p.maxValue ? `Max: ${formatNumber(p.maxValue)}` : ''} ${p.defaultValue !== undefined ? `Default: ${p.defaultValue}` : p.default !== undefined ? `Default: ${p.default}` : ''}</span>
                </div>
            `).join('')}
        </div>
        ` : ''}
    `;
    
    modal.classList.remove('hidden');
}

// Populate chat agent models
function populateChatAgentModels() {
    const chatSelect = document.getElementById('chatAgentModel');
    if (!chatSelect) return;
    
    chatSelect.innerHTML = '<option value="">Select model...</option>';
    
    allModels.filter(m => m.type === 'chat').forEach(model => {
        const option = document.createElement('option');
        option.value = `${model.provider}:${model.name}`;
        option.textContent = `${model.name} (${model.provider})`;
        chatSelect.appendChild(option);
    });
}

// Calculate chat agent cost
function calculateChatAgent() {
    const modelValue = document.getElementById('chatAgentModel').value;
    const sessionsPerDay = parseInt(document.getElementById('chatSessionsPerDay').value) || 0;
    const turnsPerSession = parseInt(document.getElementById('chatTurnsPerSession').value) || 0;
    const inputPerTurn = parseFloat(document.getElementById('chatInputPerTurn').value) || 0;
    const outputPerTurn = parseFloat(document.getElementById('chatOutputPerTurn').value) || 0;
    const contextMode = document.getElementById('chatContextMode').value;
    const slidingWindow = parseInt(document.getElementById('chatSlidingWindow').value) || 5;
    
    if (!modelValue || sessionsPerDay === 0) {
        document.getElementById('chatAgentResults').innerHTML = 
            '<div class="placeholder" style="padding: 40px;">Please select a model and enter session data</div>';
        return;
    }
    
    const [provider, name] = modelValue.split(':');
    const model = allModels.find(m => m.provider === provider && m.name === name);
    if (!model) return;
    
    const payg = model.pricing?.pay_as_you_go || {};
    // cents/token / 100 = $/token * 1,000,000,000 = $/billion
    const inputPricePerBillion = (payg.request_token?.price || 0) / 100 * 1000000000; // $/billion tokens
    const outputPricePerBillion = (payg.response_token?.price || 0) / 100 * 1000000000; // $/billion tokens
    
    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    
    // Calculate tokens based on context mode (all values are in billions)
    if (contextMode === 'full') {
        // Full context: quadratic growth
        totalInputTokens = sessionsPerDay * (inputPerTurn * turnsPerSession * (turnsPerSession + 1) / 2);
        totalOutputTokens = sessionsPerDay * (outputPerTurn * turnsPerSession);
    } else if (contextMode === 'sliding') {
        // Sliding window: linear growth
        totalInputTokens = sessionsPerDay * (inputPerTurn * turnsPerSession * slidingWindow);
        totalOutputTokens = sessionsPerDay * (outputPerTurn * turnsPerSession);
    } else {
        // Summary-based: constant context
        const summaryTokens = 0.0002; // Fixed summary size in billions (200K tokens = 0.0002B)
        totalInputTokens = sessionsPerDay * (summaryTokens + inputPerTurn) * turnsPerSession;
        totalOutputTokens = sessionsPerDay * (outputPerTurn * turnsPerSession);
    }
    
    const inputCost = totalInputTokens * inputPricePerBillion;
    const outputCost = totalOutputTokens * outputPricePerBillion;
    const totalCost = inputCost + outputCost;
    const costPerSession = totalCost / sessionsPerDay;
    const monthlyCost = totalCost * 30;
    
    document.getElementById('chatAgentResults').innerHTML = `
        <div class="stat-card" style="border: 2px solid var(--white); padding: 24px; text-align: center; margin-bottom: 20px;">
            <h3 style="margin-bottom: 16px; font-size: 12px;">Daily Cost</h3>
            <div class="stat-value" style="font-size: 42px; margin-bottom: 8px;">$${totalCost.toFixed(4)}</div>
            <div class="stat-label" style="margin-bottom: 16px;">for ${sessionsPerDay.toLocaleString()} sessions</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--white);">
                <div>
                    <div style="font-size: 11px; color: var(--white); margin-bottom: 4px;">Per Session</div>
                    <div style="font-size: 18px; font-weight: 700;">$${costPerSession.toFixed(4)}</div>
                </div>
                <div>
                    <div style="font-size: 11px; color: var(--white); margin-bottom: 4px;">Monthly Est.</div>
                    <div style="font-size: 18px; font-weight: 700;">$${monthlyCost.toFixed(2)}</div>
                </div>
            </div>
        </div>
        <div class="cost-item" style="padding: 12px 0; border-bottom: 1px solid var(--white);">
            <span style="font-weight: 600;">Input Tokens</span>
            <span style="font-weight: 700; font-size: 16px;">$${inputCost.toFixed(4)}</span>
        </div>
        <div style="font-size: 11px; color: var(--white); margin-left: 12px; margin-bottom: 12px;">
            ${totalInputTokens.toLocaleString()} tokens (${contextMode} context)
        </div>
        <div class="cost-item" style="padding: 12px 0;">
            <span style="font-weight: 600;">Output Tokens</span>
            <span style="font-weight: 700; font-size: 16px;">$${outputCost.toFixed(4)}</span>
        </div>
        <div style="font-size: 11px; color: var(--white); margin-left: 12px;">
            ${totalOutputTokens.toLocaleString()} tokens
        </div>
    `;
    
    document.getElementById('chatAgentStats').innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 11px;">
            <div>
                <div style="color: var(--white); margin-bottom: 4px;">Total Sessions</div>
                <div style="font-weight: 700; font-size: 16px;">${sessionsPerDay.toLocaleString()}</div>
            </div>
            <div>
                <div style="color: var(--white); margin-bottom: 4px;">Total Turns</div>
                <div style="font-weight: 700; font-size: 16px;">${(sessionsPerDay * turnsPerSession).toLocaleString()}</div>
            </div>
            <div>
                <div style="color: var(--white); margin-bottom: 4px;">Total Input Tokens</div>
                <div style="font-weight: 700; font-size: 16px;">${totalInputTokens.toLocaleString()}</div>
            </div>
            <div>
                <div style="color: var(--white); margin-bottom: 4px;">Total Output Tokens</div>
                <div style="font-weight: 700; font-size: 16px;">${totalOutputTokens.toLocaleString()}</div>
            </div>
        </div>
    `;
    
    // Update charts
    document.getElementById('chatAgentCharts').style.display = 'block';
    updateChatSessionChart(costPerSession, totalCost);
    updateChatTokenChart(turnsPerSession, inputPerTurn, contextMode);
}

// Update chat session chart
function updateChatSessionChart(costPerSession, totalCost) {
    const chart = document.getElementById('chatSessionChart');
    chart.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 32px; font-weight: 700; margin-bottom: 8px;">$${costPerSession.toFixed(4)}</div>
            <div style="font-size: 11px; color: var(--white);">Cost per session</div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--white);">
                <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">$${totalCost.toFixed(2)}</div>
                <div style="font-size: 11px; color: var(--white);">Total daily cost</div>
            </div>
        </div>
    `;
}

// Update chat token chart
function updateChatTokenChart(turns, tokensPerTurn, contextMode) {
    const chart = document.getElementById('chatTokenChart');
    const tokens = [];
    
    for (let i = 1; i <= turns; i++) {
        if (contextMode === 'full') {
            tokens.push(tokensPerTurn * i * (i + 1) / 2);
        } else if (contextMode === 'sliding') {
            tokens.push(tokensPerTurn * Math.min(i, 5));
        } else {
            tokens.push(tokensPerTurn * i + 200);
        }
    }
    
    const maxTokens = Math.max(...tokens);
    
    chart.innerHTML = `
        <div style="display: flex; gap: 4px; height: 150px; align-items: flex-end;">
            ${tokens.map((t, idx) => {
                const height = (t / maxTokens) * 100;
                return `
                    <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                        <div style="width: 100%; height: 150px; border: 1px solid var(--white); position: relative; display: flex; align-items: flex-end;">
                            <div style="width: 100%; height: ${height}%; background: var(--white);"></div>
                        </div>
                        <div style="font-size: 8px; margin-top: 4px; color: var(--white);">${idx + 1}</div>
                    </div>
                `;
            }).join('')}
        </div>
        <div style="text-align: center; margin-top: 12px; font-size: 10px; color: var(--white);">
            Token growth across ${turns} turns (${contextMode} context)
        </div>
    `;
}

// Populate multi-modal models
function populateMultiModalModels() {
    const multiSelect = document.getElementById('multiModalModel');
    if (!multiSelect) return;
    
    multiSelect.innerHTML = '<option value="">Select model...</option>';
    
    const multiModalModels = allModels.filter(m => 
        m.supported.includes('image') || m.type === 'image' || m.name.includes('vision') || m.name.includes('multimodal')
    );
    
    multiModalModels.forEach(model => {
        const option = document.createElement('option');
        option.value = `${model.provider}:${model.name}`;
        option.textContent = `${model.name} (${model.provider})`;
        multiSelect.appendChild(option);
    });
    
    // Also add regular chat models that support images
    allModels.filter(m => m.supported.includes('image') && m.type === 'chat').forEach(model => {
        const option = document.createElement('option');
        option.value = `${model.provider}:${model.name}`;
        option.textContent = `${model.name} (${model.provider})`;
        multiSelect.appendChild(option);
    });
}

// Calculate multi-modal cost
function calculateMultiModal() {
    const modelValue = document.getElementById('multiModalModel').value;
    const textTokens = parseFloat(document.getElementById('multiTextTokens').value) || 0;
    const numImages = parseInt(document.getElementById('multiNumImages').value) || 0;
    const imageRes = parseInt(document.getElementById('multiImageRes').value) || 1024;
    const audioSeconds = parseInt(document.getElementById('multiAudioSeconds').value) || 0;
    const videoSeconds = parseInt(document.getElementById('multiVideoSeconds').value) || 0;
    const outputTokens = parseFloat(document.getElementById('multiOutputTokens').value) || 0;
    
    if (!modelValue) {
        document.getElementById('multiModalResults').innerHTML = 
            '<div class="placeholder" style="padding: 40px;">Please select a model</div>';
        return;
    }
    
    const [provider, name] = modelValue.split(':');
    const model = allModels.find(m => m.provider === provider && m.name === name);
    if (!model) return;
    
    const payg = model.pricing?.pay_as_you_go || {};
    // cents/token / 100 = $/token * 1,000,000,000 = $/billion
    const inputPricePerBillion = (payg.request_token?.price || 0) / 100 * 1000000000; // $/billion tokens
    const outputPricePerBillion = (payg.response_token?.price || 0) / 100 * 1000000000; // $/billion tokens
    
    // Calculate image tokens
    const tokensPerImage = Math.ceil((imageRes * imageRes) / 768); // Approximate formula
    const imageTokens = numImages * tokensPerImage;
    
    // Calculate audio tokens (approximate: 1 second = 50 tokens)
    const audioTokens = audioSeconds * 50;
    
    // Calculate video tokens (approximate: 1 second = 200 tokens)
    const videoTokens = videoSeconds * 200;
    
    // textTokens is in billions, convert image/audio/video tokens to billions
    const imageTokensBillion = imageTokens / 1000000000;
    const audioTokensBillion = audioTokens / 1000000000;
    const videoTokensBillion = videoTokens / 1000000000;
    
    const totalInputTokensBillion = textTokens + imageTokensBillion + audioTokensBillion + videoTokensBillion;
    const inputCost = totalInputTokensBillion * inputPricePerBillion;
    const outputCost = outputTokens * outputPricePerBillion;
    const totalCost = inputCost + outputCost;
    
    document.getElementById('multiModalResults').innerHTML = `
        <div class="stat-card" style="border: 2px solid var(--white); padding: 24px; text-align: center; margin-bottom: 20px;">
            <h3 style="margin-bottom: 16px; font-size: 12px;">Total Cost</h3>
            <div class="stat-value" style="font-size: 42px; margin-bottom: 8px;">$${totalCost.toFixed(4)}</div>
        </div>
        <div class="cost-item" style="padding: 12px 0; border-bottom: 1px solid var(--white);">
            <span style="font-weight: 600;">Input Processing</span>
            <span style="font-weight: 700; font-size: 16px;">$${inputCost.toFixed(4)}</span>
        </div>
        <div style="font-size: 11px; color: var(--white); margin-left: 12px; margin-bottom: 12px;">
            Text: ${textTokens.toLocaleString()} | Images: ${imageTokens.toLocaleString()} | Audio: ${audioTokens.toLocaleString()} | Video: ${videoTokens.toLocaleString()}
        </div>
        <div class="cost-item" style="padding: 12px 0;">
            <span style="font-weight: 600;">Output Generation</span>
            <span style="font-weight: 700; font-size: 16px;">$${outputCost.toFixed(4)}</span>
        </div>
        <div style="font-size: 11px; color: var(--white); margin-left: 12px;">
            ${outputTokens.toLocaleString()} tokens
        </div>
    `;
    
    document.getElementById('multiModalBreakdown').innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 11px;">
            <div>
                <div style="color: var(--white); margin-bottom: 4px;">Text Tokens</div>
                <div style="font-weight: 700; font-size: 16px;">${textTokens.toLocaleString()}</div>
            </div>
            <div>
                <div style="color: var(--white); margin-bottom: 4px;">Image Tokens</div>
                <div style="font-weight: 700; font-size: 16px;">${imageTokens.toLocaleString()}</div>
            </div>
            <div>
                <div style="color: var(--white); margin-bottom: 4px;">Audio Tokens</div>
                <div style="font-weight: 700; font-size: 16px;">${audioTokens.toLocaleString()}</div>
            </div>
            <div>
                <div style="color: var(--white); margin-bottom: 4px;">Video Tokens</div>
                <div style="font-weight: 700; font-size: 16px;">${videoTokens.toLocaleString()}</div>
            </div>
        </div>
    `;
}

// Add event listener for context mode change
document.addEventListener('DOMContentLoaded', () => {
    const contextModeSelect = document.getElementById('chatContextMode');
    const slidingWindowGroup = document.getElementById('chatSlidingWindowGroup');
    
    if (contextModeSelect && slidingWindowGroup) {
        contextModeSelect.addEventListener('change', (e) => {
            slidingWindowGroup.style.display = e.target.value === 'sliding' ? 'block' : 'none';
        });
    }
});

function closeModelDetail() {
    document.getElementById('modelDetailModal').classList.add('hidden');
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modelDetailModal');
    if (e.target === modal) {
        closeModelDetail();
    }
});

// Switch to documentation tab
function switchToTab(tabId) {
    const tabBtn = document.querySelector(`[data-tab="${tabId}"]`);
    if (tabBtn) {
        tabBtn.click();
    }
}

// Simulate latency animation
function simulateLatency() {
    // Try to get the calculated latency from the display, or recalculate if not available
    let totalLatency = parseInt(document.querySelector('#latencyBreakdown .stat-value')?.textContent?.replace(' ms', '') || '0');
    if (!totalLatency || totalLatency === 0) {
        // If not found, recalculate latency
        calculateLatency();
        totalLatency = parseInt(document.querySelector('#latencyBreakdown .stat-value')?.textContent?.replace(' ms', '') || '993');
    }
    
    // Create visual simulation overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center;';
    
    const simulationDiv = document.createElement('div');
    simulationDiv.style.cssText = 'background: var(--black); border: 2px solid var(--white); padding: 40px; max-width: 600px; width: 90%; position: relative;';
    simulationDiv.innerHTML = `
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">Latency Simulation</h3>
        <div style="text-align: center; margin-bottom: 30px;">
            <div class="stat-value" style="font-size: 56px; margin-bottom: 8px;" id="simLatency">0 ms</div>
            <div style="font-size: 12px; color: var(--white); margin-top: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Voice-to-Voice</div>
        </div>
        <div style="height: 8px; background: var(--black); border: 1px solid var(--white); margin-bottom: 30px; position: relative;">
            <div id="simProgress" style="height: 100%; background: var(--white); width: 0%; transition: width 0.05s;"></div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; font-size: 12px; margin-bottom: 30px;">
            <div style="text-align: center; border: 1px solid var(--white); padding: 16px;">
                <div style="font-weight: 600; margin-bottom: 8px; text-transform: uppercase; font-size: 11px;">Input Path</div>
                <div id="simInput" style="font-size: 24px; font-weight: 700; color: var(--white);">0 ms</div>
            </div>
            <div style="text-align: center; border: 1px solid var(--white); padding: 16px;">
                <div style="font-weight: 600; margin-bottom: 8px; text-transform: uppercase; font-size: 11px;">AI Processing</div>
                <div id="simAI" style="font-size: 24px; font-weight: 700; color: var(--white);">0 ms</div>
            </div>
            <div style="text-align: center; border: 1px solid var(--white); padding: 16px;">
                <div style="font-weight: 600; margin-bottom: 8px; text-transform: uppercase; font-size: 11px;">Output Path</div>
                <div id="simOutput" style="font-size: 24px; font-weight: 700; color: var(--white);">0 ms</div>
            </div>
        </div>
        <button class="btn btn-secondary" onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="width: 100%;">Close</button>
    `;
    overlay.appendChild(simulationDiv);
    document.body.appendChild(overlay);
    
    // Animate
    let current = 0;
    const inputPath = 114;
    const aiProcessing = 790;
    const outputPath = 89;
    
    const interval = setInterval(() => {
        current += 5;
        const progress = Math.min((current / totalLatency) * 100, 100);
        
        document.getElementById('simProgress').style.width = progress + '%';
        document.getElementById('simLatency').textContent = Math.min(current, totalLatency) + ' ms';
        
        if (current <= inputPath) {
            document.getElementById('simInput').textContent = current + ' ms';
            document.getElementById('simAI').textContent = '0 ms';
            document.getElementById('simOutput').textContent = '0 ms';
        } else if (current <= inputPath + aiProcessing) {
            document.getElementById('simInput').textContent = inputPath + ' ms';
            document.getElementById('simAI').textContent = (current - inputPath) + ' ms';
            document.getElementById('simOutput').textContent = '0 ms';
        } else {
            document.getElementById('simInput').textContent = inputPath + ' ms';
            document.getElementById('simAI').textContent = aiProcessing + ' ms';
            document.getElementById('simOutput').textContent = Math.min((current - inputPath - aiProcessing), outputPath) + ' ms';
        }
        
        if (current >= totalLatency) {
            clearInterval(interval);
        }
    }, 5);
}

// Export Voice AI calculation
function exportVoiceAICalculation(format) {
    const llmProvider = document.getElementById('voiceLLMProvider').value;
    const sttProvider = document.getElementById('voiceSTTProvider').value;
    const ttsProvider = document.getElementById('voiceTTSProvider').value;
    const totalCost = document.getElementById('voiceTotalCost').textContent.replace('$', '');
    const costPerMin = document.getElementById('voiceCostPerMin').textContent.replace('$', '').replace(' per minute', '');
    const inputTokens = document.getElementById('inputTokensDisplay').textContent.replace(/,/g, '');
    const outputTokens = document.getElementById('outputTokensDisplay').textContent.replace(/,/g, '');
    
    const data = {
        providers: {
            llm: llmProvider,
            stt: sttProvider,
            tts: ttsProvider
        },
        assumptions: {
            conversationLength: document.getElementById('convoLength').value,
            wordsPerMinute: document.getElementById('wordsPerMin').value,
            tokensPerWord: document.getElementById('tokensPerWord').value,
            charactersPerWord: document.getElementById('charsPerWord').value,
            turnsPerMinute: document.getElementById('turnsPerMin').value,
            llmSpeechRatio: document.getElementById('llmSpeechRatio').value,
            contextWindowTurns: document.getElementById('contextWindowTurns')?.value || 10
        },
        results: {
            totalCost: totalCost,
            costPerMinute: costPerMin,
            inputTokens: inputTokens,
            outputTokens: outputTokens
        }
    };
    
    if (format === 'csv') {
        const csv = [
            ['Provider', 'Value'],
            ['LLM Provider', llmProvider],
            ['STT Provider', sttProvider],
            ['TTS Provider', ttsProvider],
            [''],
            ['Assumption', 'Value'],
            ['Conversation Length (min)', data.assumptions.conversationLength],
            ['Words Per Minute', data.assumptions.wordsPerMinute],
            ['Tokens Per Word', data.assumptions.tokensPerWord],
            ['Characters Per Word', data.assumptions.charactersPerWord],
            ['Turns Per Minute', data.assumptions.turnsPerMinute],
            ['LLM Speech Ratio', data.assumptions.llmSpeechRatio],
            ['Context Window (turns)', data.assumptions.contextWindowTurns],
            [''],
            ['Result', 'Value'],
            ['Total Cost ($)', totalCost],
            ['Cost Per Minute ($)', costPerMin],
            ['Input Tokens', inputTokens],
            ['Output Tokens', outputTokens]
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        
        downloadFile(csv, 'voice-ai-calculation.csv', 'text/csv');
    } else {
        downloadFile(JSON.stringify(data, null, 2), 'voice-ai-calculation.json', 'application/json');
    }
}

// Voice AI Calculator
function calculateVoiceAI() {
    const llmProvider = document.getElementById('voiceLLMProvider').value;
    if (!llmProvider) {
        document.getElementById('voiceResults').innerHTML = '<div class="placeholder">Please select providers</div>';
        return;
    }
    
    const [llmProv, llmModel] = llmProvider.split(':');
    const llmModelData = allModels.find(m => m.provider === llmProv && m.name === llmModel);
    
    const vcpuCostPerMin = parseFloat(document.getElementById('vcpuCost').value) || 0;
    const agentsPerVCPU = parseFloat(document.getElementById('agentsPerVCPU').value) || 1;
    
    const convoLength = parseFloat(document.getElementById('convoLength').value) || 15;
    const wordsPerMin = parseFloat(document.getElementById('wordsPerMin').value) || 100;
    const tokensPerWord = parseFloat(document.getElementById('tokensPerWord').value) || 1.3;
    const charsPerWord = parseFloat(document.getElementById('charsPerWord').value) || 6;
    const turnsPerMin = parseFloat(document.getElementById('turnsPerMin').value) || 4;
    const llmSpeechRatio = parseFloat(document.getElementById('llmSpeechRatio').value) || 0.5;
    
    // Get LLM pricing from database
    // Default fallbacks in $/billion tokens (reasonable for fast models)
    let llmInputCost = 150; // ~$0.15/1M = $150/1B (typical for fast models like GPT-4o mini)
    let llmOutputCost = 600; // ~$0.60/1M = $600/1B
    
    if (llmModelData) {
        const payg = llmModelData.pricing?.pay_as_you_go || {};
        // Prices are in cents per token, convert to dollars per billion tokens
        // cents/token / 100 = $/token * 1B = $/billion tokens
        llmInputCost = (payg.request_token?.price || 0) / 100 * 1000000000; // $/billion tokens
        llmOutputCost = (payg.response_token?.price || 0) / 100 * 1000000000; // $/billion tokens
    }
    
    // Get STT pricing
    const sttProvider = document.getElementById('voiceSTTProvider').value;
    let transcriptionCostPerMin = parseFloat(document.getElementById('transcriptionCost').value) || 0;
    
    if (sttProvider) {
        const [sttProv, sttModel] = sttProvider.split(':');
        
        // Handle manual models with Voice AI Guide pricing (2025)
        if (sttProv === 'manual') {
            const manualPricing = {
                // Deepgram - Industry leader for Voice AI
                'deepgram-nova-2': 0.0043, // $0.0043/min - BEST VALUE
                'deepgram-nova-2-phonecall': 0.0050, // $0.005/min
                // Gladia - Best for multilingual
                'gladia-enhanced': 0.0066, // $0.0066/min
                // Whisper variants
                'whisper-v3': 0.006, // $0.006/min
                'groq-whisper': 0.003, // $0.003/min (faster)
                // AssemblyAI
                'assemblyai-best': 0.008, // $0.008/min
                // Google
                'google-chirp-2': 0.012 // $0.012/min
            };
            
            const calculatedCostPerMin = manualPricing[sttModel] || 0.006;
            const currentSTTValue = parseFloat(document.getElementById('transcriptionCost').value) || 0;
            if (Math.abs(currentSTTValue - 0.006) < 0.001 || currentSTTValue === 0) {
                transcriptionCostPerMin = calculatedCostPerMin;
                document.getElementById('transcriptionCost').value = calculatedCostPerMin.toFixed(6);
            } else {
                transcriptionCostPerMin = currentSTTValue;
            }
        } else {
            const sttModelData = allModels.find(m => m.provider === sttProv && m.name === sttModel);
            
            if (sttModelData) {
                const payg = sttModelData.pricing?.pay_as_you_go || {};
                // Audio tokens: typically ~100 tokens per minute of audio
                const audioTokenPrice = (payg.additional_units?.request_audio_token?.price || payg.request_token?.price || 0) / 100; // $ per 1K tokens
                const tokensPerMinute = 100; // Approximate
                const calculatedCostPerMin = (audioTokenPrice * tokensPerMinute) / 1000; // $/min
                
                // Auto-update if using default value
                const currentSTTValue = parseFloat(document.getElementById('transcriptionCost').value) || 0;
                if (Math.abs(currentSTTValue - 0.006) < 0.001 || currentSTTValue === 0) {
                    transcriptionCostPerMin = calculatedCostPerMin;
                    document.getElementById('transcriptionCost').value = calculatedCostPerMin.toFixed(6);
                } else {
                    transcriptionCostPerMin = currentSTTValue;
                }
            }
        }
    }
    
    // Get TTS pricing
    const ttsProvider = document.getElementById('voiceTTSProvider').value;
    let voiceCostPerChar = parseFloat(document.getElementById('voiceCost').value) || 0;
    
    if (ttsProvider) {
        const [ttsProv, ttsModel] = ttsProvider.split(':');
        
        // Handle manual models with Voice AI Guide pricing (2025)
        // TTS pricing converted to $/char (avg 600 chars/min for conversational speech)
        if (ttsProv === 'manual') {
            const manualPricing = {
                // Deepgram Aura - CHEAPEST
                'deepgram-aura': 0.0000133, // $0.008/min ÷ 600 chars/min
                // Cartesia Sonic - RECOMMENDED for Voice AI
                'cartesia-sonic': 0.0000333, // $0.02/min ÷ 600 chars/min
                // ElevenLabs
                'elevenlabs-flash-v2': 0.0000666, // $0.04/min ÷ 600 chars/min
                'elevenlabs-turbo-v2': 0.000133, // $0.08/min ÷ 600 chars/min
                // Rime
                'rime-conversational': 0.0000666, // $0.04/min ÷ 600 chars/min
                // PlayHT
                'playht-turbo': 0.0000833, // $0.05/min ÷ 600 chars/min
                // Google
                'google-tts-standard': 0.000004, // $4/1B chars
                'google-tts-wavenet': 0.000016 // $16/1B chars
            };
            
            const calculatedCostPerChar = manualPricing[ttsModel] || 0.000015;
            const currentTTSValue = parseFloat(document.getElementById('voiceCost').value) || 0;
            if (Math.abs(currentTTSValue - 0.000015) < 0.000001 || currentTTSValue === 0) {
                voiceCostPerChar = calculatedCostPerChar;
                document.getElementById('voiceCost').value = calculatedCostPerChar.toFixed(9);
            } else {
                voiceCostPerChar = currentTTSValue;
            }
        } else {
            const ttsModelData = allModels.find(m => m.provider === ttsProv && m.name === ttsModel);
            
            if (ttsModelData) {
                const payg = ttsModelData.pricing?.pay_as_you_go || {};
                // TTS: ~1 token per 4 characters, price is per 1K tokens
                const tokenPrice = (payg.request_token?.price || 0) / 100; // $ per 1K tokens
                const charsPerToken = 4; // Approximate
                const calculatedCostPerChar = tokenPrice / 1000 / charsPerToken; // $/character
                
                // Auto-update if using default value
                const currentTTSValue = parseFloat(document.getElementById('voiceCost').value) || 0;
                if (Math.abs(currentTTSValue - 0.000015) < 0.000001 || currentTTSValue === 0) {
                    voiceCostPerChar = calculatedCostPerChar;
                    document.getElementById('voiceCost').value = calculatedCostPerChar.toFixed(9);
                } else {
                    voiceCostPerChar = currentTTSValue;
                }
            }
        }
    }
    
    // Calculate tokens with sliding window context management
    const contextWindowTurns = parseFloat(document.getElementById('contextWindowTurns')?.value) || 10;
    const totalTurns = turnsPerMin * convoLength;
    const tokensPerTurn = wordsPerMin * tokensPerWord / turnsPerMin;
    
    // Input tokens: uses sliding window to cap context size
    // Early turns: context grows (1, 2, 3, ... up to windowSize)
    // Later turns: context stays at windowSize (sliding window)
    // Total = sum of (1 to min(n, windowSize)) + (totalTurns - windowSize) * windowSize
    let inputTokens;
    if (totalTurns <= contextWindowTurns) {
        // Context still growing: quadratic sum = n(n+1)/2
        inputTokens = tokensPerTurn * totalTurns * (totalTurns + 1) / 2;
    } else {
        // Sliding window active: early quadratic + later linear
        const earlySum = contextWindowTurns * (contextWindowTurns + 1) / 2;
        const laterSum = (totalTurns - contextWindowTurns) * contextWindowTurns;
        inputTokens = tokensPerTurn * (earlySum + laterSum);
    }
    
    // Output tokens: linear (each turn generates a response)
    const outputTokens = wordsPerMin * tokensPerWord * llmSpeechRatio * convoLength;
    
    // inputTokens and outputTokens are in actual tokens (calculated from voice conversation)
    // Convert to billions for cost calculation with prices per billion
    const inputTokensBillion = inputTokens / 1000000000;
    const outputTokensBillion = outputTokens / 1000000000;
    
    // Calculate costs (llmInputCost and llmOutputCost are now in $/billion tokens)
    const transcriptionCost = transcriptionCostPerMin * convoLength;
    const llmCost = (inputTokensBillion * llmInputCost) + (outputTokensBillion * llmOutputCost);
    // TTS cost: generates audio for LLM/AI speech (not user speech)
    // User speech goes through STT (transcription), AI response goes through TTS
    const voiceCost = voiceCostPerChar * wordsPerMin * charsPerWord * llmSpeechRatio * convoLength;
    const hostingCost = (vcpuCostPerMin * convoLength) / agentsPerVCPU;
    
    const totalCost = transcriptionCost + llmCost + voiceCost + hostingCost;
    const costPerMin = totalCost / convoLength;
    
    // Update results
    document.getElementById('voiceTotalCost').textContent = `$${totalCost.toFixed(4)}`;
    document.getElementById('voiceCostPerMin').textContent = `$${costPerMin.toFixed(4)} per minute`;
    
    // Update token usage
    document.getElementById('inputTokensDisplay').textContent = Math.round(inputTokens).toLocaleString();
    document.getElementById('outputTokensDisplay').textContent = Math.round(outputTokens).toLocaleString();
    
    // Prices are already in $/billion tokens
    document.getElementById('voiceCostBreakdown').innerHTML = `
        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--white);">Cost Breakdown</div>
        <div class="cost-item" style="padding: 12px 0;">
            <span style="font-weight: 600;">Transcription</span>
            <span style="font-weight: 700; font-size: 16px;">$${transcriptionCost.toFixed(4)}</span>
        </div>
        <div style="font-size: 11px; color: var(--white); margin-left: 12px; margin-bottom: 12px;">
            ${convoLength.toFixed(1)} min × $${transcriptionCostPerMin.toFixed(6)}/min
        </div>
        <div class="cost-item" style="padding: 12px 0;">
            <span style="font-weight: 600;">LLM</span>
            <span style="font-weight: 700; font-size: 16px;">$${llmCost.toFixed(4)}</span>
        </div>
        <div style="font-size: 11px; color: var(--white); margin-left: 12px; margin-bottom: 12px;">
            Input: ${inputTokensBillion.toFixed(4)}B tokens × $${llmInputCost.toFixed(2)}/1B = $${(inputTokensBillion * llmInputCost).toFixed(4)}<br>
            Output: ${outputTokensBillion.toFixed(4)}B tokens × $${llmOutputCost.toFixed(2)}/1B = $${(outputTokensBillion * llmOutputCost).toFixed(4)}
        </div>
        <div class="cost-item" style="padding: 12px 0;">
            <span style="font-weight: 600;">Voice</span>
            <span style="font-weight: 700; font-size: 16px;">$${voiceCost.toFixed(4)}</span>
        </div>
        <div style="font-size: 11px; color: var(--white); margin-left: 12px; margin-bottom: 12px;">
            ${Math.round(wordsPerMin * charsPerWord * llmSpeechRatio * convoLength).toLocaleString()} chars × $${voiceCostPerChar.toFixed(9)}/char
        </div>
        <div class="cost-item" style="padding: 12px 0;">
            <span style="font-weight: 600;">Hosting</span>
            <span style="font-weight: 700; font-size: 16px;">$${hostingCost.toFixed(4)}</span>
        </div>
        <div style="font-size: 11px; color: var(--white); margin-left: 12px;">
            ${convoLength.toFixed(1)} min × $${vcpuCostPerMin.toFixed(8)}/min ÷ ${agentsPerVCPU} agent${agentsPerVCPU > 1 ? 's' : ''}
        </div>
    `;
    
    // Calculate latency
    calculateLatency();
}

function calculateLatency() {
    // Get selected models
    const llmProvider = document.getElementById('voiceLLMProvider')?.value;
    const sttProvider = document.getElementById('voiceSTTProvider')?.value;
    const ttsProvider = document.getElementById('voiceTTSProvider')?.value;
    
    // Get conversation parameters to calculate per-turn tokens
    // Voice-to-voice latency is per turn, not for the entire conversation
    const wordsPerMin = parseFloat(document.getElementById('wordsPerMin')?.value || 100);
    const tokensPerWord = parseFloat(document.getElementById('tokensPerWord')?.value || 1.3);
    const turnsPerMin = parseFloat(document.getElementById('turnsPerMin')?.value || 4);
    const llmSpeechRatio = parseFloat(document.getElementById('llmSpeechRatio')?.value || 0.5);
    
    // Calculate tokens for a SINGLE turn (not the entire conversation)
    // Input: average tokens per user turn (words per turn * tokens per word)
    const wordsPerTurn = wordsPerMin / turnsPerMin;
    const inputTokensPerTurn = wordsPerTurn * tokensPerWord;
    
    // Output: tokens for AI response in one turn
    const outputTokensPerTurn = wordsPerTurn * tokensPerWord * llmSpeechRatio;
    
    // Latency components (in milliseconds)
    const micInput = 40;
    const opusEncoding = 21;
    const networkTransit = 10;
    const packetHandling = 2;
    const jitterBuffer = 40;
    const opusDecoding = 1;
    const speakerOutput = 15;
    
    // Calculate dynamic transcription latency based on STT model
    let transcription = 300; // Default
    if (sttProvider) {
        const [sttProv, sttModel] = sttProvider.split(':');
        
        // Try to look up the model in allModels to get the actual model name
        let actualModelName = sttModel;
        let actualProvider = sttProv;
        
        if (sttProv !== 'manual') {
            const sttModelData = allModels.find(m => m.provider === sttProv && m.name === sttModel);
            if (sttModelData) {
                actualModelName = sttModelData.name;
                actualProvider = sttModelData.provider;
            }
        }
        
        // Model-specific latency estimates (in milliseconds)
        // NOTE: These are based on real-world data from the Voice AI Guide (2025)
        // Source: https://github.com/pipecat-ai/pipecat Voice AI Primer
        // STT TTFT (Time to First Token) latencies
        const sttLatencies = {
            // Deepgram (Recommended for Voice AI - fastest)
            'nova-2': 150, // Deepgram Nova-2: ~150ms TTFT for US users
            'deepgram-nova-2': 150,
            'nova-2-general': 150,
            // Gladia (Best for multilingual)
            'enhanced': 200, // Gladia Enhanced: ~200ms
            'gladia-enhanced': 200,
            // OpenAI models
            'whisper-1': 400, // Whisper has ~400ms TTFT
            'whisper-large-v3': 450,
            'whisper-large-v3-turbo': 300, // Groq's faster version
            'gpt-4o-transcribe': 250, // Newer OpenAI STT
            'gpt-4o-mini-transcribe': 200,
            // Google
            'speech': 300, // Google Cloud Speech-to-Text
            // AWS
            'transcribe': 350, // Amazon Transcribe
            // AssemblyAI
            'assemblyai-universal': 280,
            // Manual model latencies (Voice AI Guide)
            'deepgram-nova-2': 150,
            'deepgram-nova-2-phonecall': 150,
            'gladia-enhanced': 200,
            'whisper-v3': 400,
            'groq-whisper': 300,
            'assemblyai-best': 280,
            'google-chirp-2': 300,
            // Provider-based fallbacks (from Voice AI Guide)
            'deepgram': 150, // Best: ~150ms
            'gladia': 200,
            'openai': 400, // Whisper ~400ms
            'groq': 300, // Groq Whisper ~300ms
            'azure': 300,
            'google': 300,
            'aws': 350,
            'assemblyai': 280,
            'manual': 200 // Default for manual
        };
        
        // Try model name first, then provider, then default
        transcription = sttLatencies[actualModelName] || 
                      sttLatencies[actualModelName.toLowerCase()] ||
                      sttLatencies[actualProvider] || 
                      sttLatencies[actualProvider.toLowerCase()] || 
                      300;
    }
    
    // Calculate dynamic LLM inference latency based on model and per-turn tokens
    let llmInference = 350; // Default
    if (llmProvider && inputTokensPerTurn > 0 && outputTokensPerTurn > 0) {
        const [llmProv, llmModel] = llmProvider.split(':');
        const llmModelData = allModels.find(m => m.provider === llmProv && m.name === llmModel);
        
        // Use shared getModelProcessingSpeed function for consistent 2026 estimates
        const processingSpeed = getModelProcessingSpeed(llmModel);
        
        // Calculate LLM latency for a SINGLE turn: input processing + output processing (streaming first token)
        // Note: We use per-turn tokens, not total conversation tokens
        // Input processing is much faster (parallelized) - use 50x speed multiplier
        const inputProcessingSpeed = processingSpeed * 50;
        const inputProcessingTime = (inputTokensPerTurn / inputProcessingSpeed) * 1000;
        const outputProcessingTime = (outputTokensPerTurn / processingSpeed) * 1000;
        // For voice AI, we care about time to first token for natural conversation
        // Use 30% of full output time (streaming starts quickly) + input processing
        llmInference = Math.round(inputProcessingTime + (outputProcessingTime * 0.3));
    }
    
    // Calculate dynamic TTS latency based on TTS model
    let tts = 120; // Default
    if (ttsProvider) {
        const [ttsProv, ttsModel] = ttsProvider.split(':');
        
        // Try to look up the model in allModels to get the actual model name
        let actualModelName = ttsModel;
        let actualProvider = ttsProv;
        
        if (ttsProv !== 'manual') {
            const ttsModelData = allModels.find(m => m.provider === ttsProv && m.name === ttsModel);
            if (ttsModelData) {
                actualModelName = ttsModelData.name;
                actualProvider = ttsModelData.provider;
            }
        }
        
        // Model-specific latency estimates (in milliseconds)
        // NOTE: These are based on real-world data from the Voice AI Guide (2025)
        // Source: https://github.com/pipecat-ai/pipecat Voice AI Primer
        // TTS TTFB (Time to First Byte) latencies - February 2025 benchmarks
        const ttsLatencies = {
            // Cartesia (Recommended - SSM architecture, low latency)
            'sonic': 190, // Cartesia Sonic: 190ms median, 260ms P95
            'cartesia-sonic': 190,
            // Deepgram Aura (Cheapest and fast)
            'aura': 150, // Deepgram Aura: 150ms median, 320ms P95
            'deepgram-aura': 150,
            // ElevenLabs
            'flash-v2': 170, // ElevenLabs Flash v2: 170ms median, 190ms P95
            'turbo-v2': 300, // ElevenLabs Turbo v2: 300ms median, 510ms P95
            'elevenlabs-flash-v2': 170,
            'elevenlabs-turbo-v2': 300,
            // Rime (Conversational speech models)
            'conversational': 340, // Rime: 340ms median, 980ms P95
            'rime-conversational': 340,
            // OpenAI TTS
            'tts-1': 200, // OpenAI TTS-1
            'tts-1-hd': 250, // Higher quality, slightly slower
            'gpt-4o-mini-tts': 150, // Steerable TTS
            // Google
            'wavenet': 200, // Google WaveNet
            'neural': 180, // Google Neural TTS
            // AWS
            'polly': 180, // Amazon Polly
            // Manual model latencies (Voice AI Guide)
            'deepgram-aura': 150,
            'cartesia-sonic': 190,
            'elevenlabs-flash-v2': 170,
            'elevenlabs-turbo-v2': 300,
            'rime-conversational': 340,
            'playht-turbo': 250,
            'google-tts-standard': 200,
            'google-tts-wavenet': 200,
            // Provider-based fallbacks (from Voice AI Guide)
            'cartesia': 190, // Best balance: 190ms
            'deepgram': 150, // Fastest: 150ms
            'elevenlabs': 170, // Flash v2: 170ms
            'rime': 340,
            'openai': 200,
            'google': 200,
            'azure': 200,
            'aws': 180,
            'manual': 190 // Default for manual
        };
        
        // Try model name first, then provider, then default
        tts = ttsLatencies[actualModelName] || 
              ttsLatencies[actualModelName.toLowerCase()] ||
              ttsLatencies[actualProvider] || 
              ttsLatencies[actualProvider.toLowerCase()] || 
              120;
    }
    
    const sentenceAggregation = 20;
    
    const inputPath = micInput + opusEncoding + networkTransit + packetHandling + jitterBuffer + opusDecoding;
    const aiProcessing = transcription + llmInference + sentenceAggregation + tts;
    const outputPath = opusEncoding + packetHandling + networkTransit + jitterBuffer + opusDecoding + speakerOutput;
    
    const totalLatency = inputPath + aiProcessing + outputPath;
    
    let latencyStatus = 'Fast';
    let statusClass = '';
    let statusBarColor = 'var(--white)';
    if (totalLatency > 1000) {
        latencyStatus = 'Slow';
        statusClass = 'style="color: var(--white); font-weight: 700;"';
        statusBarColor = 'var(--white)';
    } else if (totalLatency > 800) {
        latencyStatus = 'Acceptable';
        statusClass = 'style="color: var(--white);"';
        statusBarColor = 'var(--white)';
    } else {
        statusBarColor = 'var(--white)';
    }
    
    const latencyPercentage = Math.min((totalLatency / 1200) * 100, 100);
    
    document.getElementById('latencyBreakdown').innerHTML = `
        <div class="stat-card" style="margin-bottom: 20px; border: 1px solid var(--white); padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 24px;">
                <div style="flex: 1;">
                    <h3 style="margin-bottom: 12px; font-size: 12px; text-transform: uppercase;">Total Voice-to-Voice Latency</h3>
                    <div class="stat-value" ${statusClass} style="font-size: 48px; margin-bottom: 8px;">${totalLatency} ms</div>
                    <div class="stat-label" style="margin-top: 8px; font-size: 13px;">${latencyStatus} ${totalLatency < 800 ? '(<800ms)' : totalLatency < 1000 ? '(800-1000ms)' : '(>1000ms)'}</div>
                </div>
                <button class="btn btn-secondary" onclick="simulateLatency()" style="margin-left: 20px;">Simulate</button>
            </div>
            <div style="margin-top: 24px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 12px; font-weight: 600;">
                    <span>Fast (<800ms)</span>
                    <span>Acceptable</span>
                    <span>Slow (>1000ms)</span>
                </div>
                <div style="height: 12px; background: var(--black); border: 2px solid var(--white); position: relative; overflow: hidden;">
                    <div style="position: absolute; left: 0; top: 0; height: 100%; width: ${latencyPercentage}%; background: ${statusBarColor}; transition: width 0.3s;"></div>
                    <div style="position: absolute; left: 66.67%; top: 0; width: 2px; height: 100%; background: var(--white);"></div>
                    <div style="position: absolute; left: 83.33%; top: 0; width: 2px; height: 100%; background: var(--white);"></div>
                </div>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--white); display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center;">
                <div>
                    <div style="font-size: 11px; color: var(--white); margin-bottom: 4px;">Input Path</div>
                    <div style="font-size: 18px; font-weight: 700;">${inputPath} ms</div>
                </div>
                <div>
                    <div style="font-size: 11px; color: var(--white); margin-bottom: 4px;">AI Processing</div>
                    <div style="font-size: 18px; font-weight: 700;">${aiProcessing} ms</div>
                </div>
                <div>
                    <div style="font-size: 11px; color: var(--white); margin-bottom: 4px;">Output Path</div>
                    <div style="font-size: 18px; font-weight: 700;">${outputPath} ms</div>
                </div>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">
            <div class="stat-card" style="border: 1px solid var(--black); padding: 20px;">
                <h3 style="margin-bottom: 16px; font-size: 11px; text-transform: uppercase; font-weight: 600;">Input Path</h3>
                <div class="stat-value" style="font-size: 32px; margin-bottom: 20px; text-align: center;">${inputPath} ms</div>
                <div style="font-size: 11px; color: var(--white);">
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>Mic Input</span><span style="font-weight: 600;">40 ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>Opus Encoding</span><span style="font-weight: 600;">21 ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>Network Transit</span><span style="font-weight: 600;">10 ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>Packet Handling</span><span style="font-weight: 600;">2 ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>Jitter Buffer</span><span style="font-weight: 600;">40 ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; display: flex; justify-content: space-between;">
                        <span>Opus Decoding</span><span style="font-weight: 600;">1 ms</span>
                    </div>
                </div>
            </div>
            <div class="stat-card" style="border: 1px solid var(--black); padding: 20px;">
                <h3 style="margin-bottom: 16px; font-size: 11px; text-transform: uppercase; font-weight: 600;">AI Processing</h3>
                <div class="stat-value" style="font-size: 32px; margin-bottom: 20px; text-align: center;">${aiProcessing} ms</div>
                <div style="font-size: 11px; color: var(--white);">
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>Transcription & Endpointing</span><span style="font-weight: 600;">${transcription} ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>LLM Inference</span><span style="font-weight: 600;">${llmInference} ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>Sentence Aggregation</span><span style="font-weight: 600;">${sentenceAggregation} ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; display: flex; justify-content: space-between;">
                        <span>Text-to-Speech</span><span style="font-weight: 600;">${tts} ms</span>
                    </div>
                </div>
            </div>
            <div class="stat-card" style="border: 1px solid var(--black); padding: 20px;">
                <h3 style="margin-bottom: 16px; font-size: 11px; text-transform: uppercase; font-weight: 600;">Output Path</h3>
                <div class="stat-value" style="font-size: 32px; margin-bottom: 20px; text-align: center;">${outputPath} ms</div>
                <div style="font-size: 11px; color: var(--white);">
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>Opus Encoding</span><span style="font-weight: 600;">21 ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>Packet Handling</span><span style="font-weight: 600;">2 ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>Network Transit</span><span style="font-weight: 600;">10 ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>Jitter Buffer</span><span style="font-weight: 600;">40 ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; border-bottom: 1px solid var(--white); display: flex; justify-content: space-between;">
                        <span>Opus Decoding</span><span style="font-weight: 600;">1 ms</span>
                    </div>
                    <div class="detail-item" style="padding: 8px 0; display: flex; justify-content: space-between;">
                        <span>Speaker Output</span><span style="font-weight: 600;">15 ms</span>
                    </div>
                </div>
            </div>
        </div>
        <div style="border: 1px solid var(--white); padding: 20px; background: var(--black); margin-top: 20px;">
            <h4 style="font-size: 11px; font-weight: 600; margin-bottom: 12px; text-transform: uppercase;">About Voice-to-Voice Latency</h4>
            <p style="font-size: 11px; color: var(--white); line-height: 1.8;">
                Voice-to-Voice latency measures the total time from when a user finishes speaking to when they hear the AI response. Lower latency creates more natural conversational experiences. Production voice AI typically aims for 800ms or lower.
            </p>
        </div>
    `;
}

// ============================================
// POPULAR MODELS TAB FUNCTIONS
// ============================================

// Populate Popular Models dropdown
function populatePopularModels() {
    const select = document.getElementById('popularModelSelect');
    if (!select) {
        console.error('popularModelSelect not found');
        return;
    }
    
    // Clear existing options except the first placeholder
    while (select.children.length > 1) {
        select.removeChild(select.lastChild);
    }
    
    console.log(`Populating popular models. allModels count: ${allModels.length}, POPULAR_MODELS_DATA count: ${POPULAR_MODELS_DATA.length}`);
    
    // Group models by provider
    const providers = {};
    POPULAR_MODELS_DATA.forEach(model => {
        if (!providers[model.provider]) {
            providers[model.provider] = [];
        }
        providers[model.provider].push(model);
    });
    
    // Add grouped options
    Object.keys(providers).sort().forEach(provider => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = provider.charAt(0).toUpperCase() + provider.slice(1).replace('-', ' ');
        
        providers[provider].forEach(model => {
            // Check if model exists in allModels for pricing data
            const exists = allModels.find(m => m.provider === model.provider && m.name === model.name);
            const option = document.createElement('option');
            option.value = `${model.provider}:${model.name}`;
            option.textContent = model.displayName + (exists ? '' : ' (N/A)');
            // Don't disable - allow selection even without pricing data
            optgroup.appendChild(option);
        });
        
        select.appendChild(optgroup);
    });
}

// Calculate Popular Model cost and latency
function calculatePopularModel() {
    const modelValue = document.getElementById('popularModelSelect')?.value;
    const costDetails = document.getElementById('popularCostDetails');
    const latencyDetails = document.getElementById('popularLatencyDetails');
    const modelInfo = document.getElementById('popularModelInfo');
    const modelSpecs = document.getElementById('popularModelSpecs');
    
    if (!modelValue || !costDetails) {
        if (costDetails) costDetails.innerHTML = '<div style="color: var(--gray-500); text-align: center; padding: 20px;">Select a model to see cost analysis</div>';
        if (latencyDetails) latencyDetails.innerHTML = '<div style="color: var(--gray-500); text-align: center; padding: 20px;">Select a model to see latency analysis</div>';
        if (modelInfo) modelInfo.style.display = 'none';
        document.getElementById('popularTotalCost').textContent = '$0.00';
        document.getElementById('popularPerRequestCost').textContent = '$0.00';
        document.getElementById('popularTotalLatency').textContent = '0 ms';
        document.getElementById('popularTTFT').textContent = '0 ms';
        document.getElementById('popularOutputSpeed').textContent = '0 tok/s';
        return;
    }
    
    const [provider, modelName] = modelValue.split(':');
    
    // Get model data from allModels (for pricing) and POPULAR_MODELS_DATA (for latency)
    const model = allModels.find(m => m.provider === provider && m.name === modelName);
    const popularModel = POPULAR_MODELS_DATA.find(m => m.provider === provider && m.name === modelName);
    
    if (!model || !popularModel) {
        costDetails.innerHTML = '<div style="color: var(--gray-500); text-align: center; padding: 20px;">Model data not available</div>';
        return;
    }
    
    // Get input values
    const inputTokens = parseFloat(document.getElementById('popularInputTokens').value) || 0;
    const outputTokens = parseFloat(document.getElementById('popularOutputTokens').value) || 0;
    const numRequests = parseInt(document.getElementById('popularNumRequests').value) || 1;
    const streamingEnabled = document.getElementById('popularStreamingMode').value === 'true';
    const networkLatency = parseInt(document.getElementById('popularNetworkLatency').value) || 50;
    
    // Calculate costs
    const payg = model.pricing?.pay_as_you_go || {};
    const inputPricePerBillion = (payg.request_token?.price || 0) / 100 * 1000000000;
    const outputPricePerBillion = (payg.response_token?.price || 0) / 100 * 1000000000;
    
    const inputCost = inputTokens * inputPricePerBillion;
    const outputCost = outputTokens * outputPricePerBillion;
    const totalPerRequest = inputCost + outputCost;
    const total = totalPerRequest * numRequests;
    
    // Calculate latency
    const inputTokensActual = inputTokens * 1000000000;
    const outputTokensActual = outputTokens * 1000000000;
    
    const outputSpeed = popularModel.outputSpeed;
    const inputProcessingSpeed = outputSpeed * 50; // Input processing is parallelized
    const inputProcessingTime = (inputTokensActual / inputProcessingSpeed) * 1000;
    
    const fullOutputTime = (outputTokensActual / outputSpeed) * 1000;
    const outputProcessingTime = streamingEnabled ? 
        Math.min(200, Math.max(50, fullOutputTime * 0.1)) : fullOutputTime;
    
    // TTFT - Time to First Token
    const ttftAvg = (popularModel.ttftMin + popularModel.ttftMax) / 2;
    const ttft = networkLatency + inputProcessingTime + (streamingEnabled ? ttftAvg : 0);
    
    const totalLatency = (networkLatency * 2) + inputProcessingTime + outputProcessingTime + ttftAvg;
    
    // Update model info
    if (modelInfo && modelSpecs) {
        modelInfo.style.display = 'block';
        modelSpecs.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 12px;">
                <div>
                    <div style="color: var(--gray-500); font-size: 10px; margin-bottom: 4px;">Provider</div>
                    <div style="font-weight: 600;">${provider.charAt(0).toUpperCase() + provider.slice(1).replace('-', ' ')}</div>
                </div>
                <div>
                    <div style="color: var(--gray-500); font-size: 10px; margin-bottom: 4px;">Tier</div>
                    <div style="font-weight: 600;">${popularModel.tier.replace('-', ' ').toUpperCase()}</div>
                </div>
                <div>
                    <div style="color: var(--gray-500); font-size: 10px; margin-bottom: 4px;">Context Window</div>
                    <div style="font-weight: 600;">${formatNumber(popularModel.contextWindow)} tokens</div>
                </div>
                <div>
                    <div style="color: var(--gray-500); font-size: 10px; margin-bottom: 4px;">Output Speed</div>
                    <div style="font-weight: 600;">${outputSpeed} tok/s</div>
                </div>
            </div>
        `;
    }
    
    // Update cost details
    costDetails.innerHTML = `
        ${inputCost > 0 ? `<div class="cost-item"><span>Input (${(inputTokens * 1e9).toLocaleString()} tokens)</span><span>$${inputCost.toFixed(6)}</span></div>` : ''}
        ${outputCost > 0 ? `<div class="cost-item"><span>Output (${(outputTokens * 1e9).toLocaleString()} tokens)</span><span>$${outputCost.toFixed(6)}</span></div>` : ''}
        ${numRequests > 1 ? `<div class="cost-item"><span>× ${numRequests} requests</span><span></span></div>` : ''}
    `;
    
    // Update latency details
    latencyDetails.innerHTML = `
        <div class="cost-item"><span>Network (round-trip)</span><span>${networkLatency * 2} ms</span></div>
        <div class="cost-item"><span>Input Processing</span><span>${Math.round(inputProcessingTime)} ms</span></div>
        <div class="cost-item"><span>Model TTFT (avg)</span><span>${Math.round(ttftAvg)} ms</span></div>
        <div class="cost-item"><span>Output Generation${streamingEnabled ? ' (streaming)' : ''}</span><span>${Math.round(outputProcessingTime)} ms</span></div>
    `;
    
    // Update summary values
    document.getElementById('popularTotalCost').textContent = `$${total.toFixed(6)}`;
    document.getElementById('popularPerRequestCost').textContent = `$${totalPerRequest.toFixed(6)}`;
    document.getElementById('popularTotalLatency').textContent = formatLatency(totalLatency);
    document.getElementById('popularTTFT').textContent = formatLatency(ttft);
    document.getElementById('popularOutputSpeed').textContent = `${outputSpeed} tok/s`;
}

