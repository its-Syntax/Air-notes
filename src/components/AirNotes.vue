<script setup>
import { reactive, watch, onMounted } from 'vue'

const STORAGE_KEY = 'air-notes:v1'

const state = reactive({
  departure: {
    callsign: '',
    atis: '',
    stand: '',
    qnh: '',
    rwy: '',
    sid: '',
    initial: '',
    squawk: '',
    taxi: '',
    notes: ''
  },
  arrival: {
    atis: '',
    qnh: '',
    rwy: '',
    star: '',
    approach: '',
    gate: '',
    taxi: '',
    notes: ''
  }
})

onMounted(() => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      Object.assign(state.departure, parsed.departure ?? {})
      Object.assign(state.arrival, parsed.arrival ?? {})
    }
  } catch {}
})

watch(
  state,
  () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  },
  { deep: true }
)

function resetAll() {
  for (const s of [state.departure, state.arrival]) {
    for (const k of Object.keys(s)) s[k] = ''
  }
}

const departureFields = [
  { key: 'callsign', label: 'Callsign ✈️', placeholder: 'SAS123' },
  { key: 'atis', label: 'ATIS Info 📻', placeholder: 'ATIS X' },
  { key: 'stand', label: 'Stand 🅿️', placeholder: 'A12' },
  { key: 'qnh', label: 'QNH 🧭', placeholder: '1013' },
  { key: 'rwy', label: 'RWY 🛫', placeholder: '01L' },
  { key: 'sid', label: 'SID 🧭', placeholder: 'OSL1A' },
  { key: 'initial', label: 'Init Alt ⬆️', placeholder: '5000' },
  { key: 'squawk', label: 'Squawk 📟', placeholder: '2000' }
]

const arrivalFields = [
  { key: 'atis', label: 'ATIS Info 📻', placeholder: 'ATIS Y' },
  { key: 'qnh', label: 'QNH 🧭', placeholder: '1015' },
  { key: 'rwy', label: 'RWY 🛬', placeholder: '19R' },
  { key: 'star', label: 'STAR 🧭', placeholder: 'KISTO2A' },
  { key: 'approach', label: 'Approach 🎯', placeholder: 'ILS 19R' }
]
</script>

<template>
  <div class="page">
    <header class="top">
      <div class="brand">
        <svg class="logo" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M6 40l52-16-2-6-21 6-8-10-5 1 6 11-17 5-5 9 6-1 5-6 9-2 7 5-9 9 5 2 12-11 12 2 4-4-16-3-10-7" stroke="currentColor" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h1>Air Notes</h1>
      </div>
      <div class="actions">
        <button class="ghost" @click="resetAll" title="Clear all fields">Reset</button>
      </div>
    </header>

    <main class="content">
      <section class="panel fade">
        <h2>Departure</h2>
        <div class="grid">
          <div v-for="f in departureFields" :key="f.key" class="cell">
            <label :for="'dep-'+f.key">{{ f.label }}</label>
            <input :id="'dep-'+f.key" v-model="state.departure[f.key]" :placeholder="f.placeholder" />
          </div>
          <div class="cell span-2">
            <label for="dep-taxi">Taxi 🛣️</label>
            <textarea id="dep-taxi" rows="2" v-model="state.departure.taxi" placeholder="Taxi route"></textarea>
          </div>
          <div class="cell">
            <label for="dep-notes">Notes 📝</label>
            <textarea id="dep-notes" rows="2" v-model="state.departure.notes" placeholder="Departure notes"></textarea>
          </div>
        </div>
      </section>

      <section class="panel fade">
        <h2>Arrival</h2>
        <div class="grid">
          <div class="cell">
            <label for="arr-callsign">Callsign ✈️</label>
            <input id="arr-callsign" :value="state.departure.callsign" disabled placeholder="Same as departure" />
          </div>
          <div v-for="f in arrivalFields" :key="f.key" class="cell">
            <label :for="'arr-'+f.key">{{ f.label }}</label>
            <input :id="'arr-'+f.key" v-model="state.arrival[f.key]" :placeholder="f.placeholder" />
          </div>
          <div class="cell span-2">
            <label for="arr-taxi">Taxi 🛣️</label>
            <textarea id="arr-taxi" rows="2" v-model="state.arrival.taxi" placeholder="Taxi in"></textarea>
          </div>
          <div class="cell">
            <label for="arr-gate">Gate 🅿️</label>
            <input id="arr-gate" v-model="state.arrival.gate" placeholder="B22" />
          </div>
          <div class="cell span-3">
            <label for="arr-notes">Notes 📝</label>
            <textarea id="arr-notes" rows="2" v-model="state.arrival.notes" placeholder="Approach notes, crossing, etc."></textarea>
          </div>
        </div>
      </section>
    </main>
  </div>
  
</template>

<style scoped>
:root {
  --bg: #0b0e13;
  --panel: #10141b;
  --panel-2: #121824;
  --text: #e9e9ef;
  --muted: #a0a7b4;
  --accent: #ffb400; /* amber */
  --accent-2: #ff8c00; /* darker orange */
  --ring: 0 0 0 2px rgba(255, 180, 0, 0.3), 0 0 18px rgba(255, 140, 0, 0.25);
}

.page {
  min-height: 100vh;
  background: radial-gradient(1200px 600px at 80% -10%, #1d2330 0%, transparent 60%),
              radial-gradient(800px 400px at 10% 110%, #1a1f2a 0%, transparent 60%),
              var(--bg);
  color: var(--text);
  padding: 2rem 1rem 3rem;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 auto 1rem;
  max-width: 1100px;
}

.brand { display: flex; align-items: center; gap: 0.75rem; }
.brand h1 { letter-spacing: 0.03em; font-weight: 700; text-shadow: 0 0 18px rgba(255, 180, 0, 0.18); }
.logo { width: 32px; height: 32px; color: var(--accent); filter: drop-shadow(0 0 8px rgba(255, 140, 0, .4)); }

.actions .ghost {
  background: transparent;
  border: 1px solid rgba(255, 180, 0, 0.45);
  color: var(--text);
  padding: 0.45rem 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  transition: transform .12s ease, box-shadow .15s ease, border-color .15s ease;
}
.actions .ghost:hover { box-shadow: var(--ring); border-color: rgba(255, 180, 0, 0.9); transform: translateY(-1px); }

.content { max-width: 1100px; margin: 0 auto; display: grid; gap: 1.5rem; }

.panel {
  background: linear-gradient(180deg, var(--panel), var(--panel-2));
  border: 1px solid rgba(255, 180, 0, 0.18);
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 18px 40px rgba(0,0,0,.35);
}

.panel h2 {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.95rem;
  color: var(--accent);
  margin-bottom: 0.9rem;
  text-shadow: 0 0 14px rgba(255, 180, 0, 0.35);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}

.cell { display: grid; gap: 0.35rem; }
.cell span { color: var(--muted); }
.cell label { color: var(--muted); font-size: 0.82rem; letter-spacing: .02em; }

input, textarea {
  background: #0d121a;
  color: #fff7e6;
  border: 1px solid rgba(255, 180, 0, 0.35);
  border-radius: 12px;
  padding: 0.65rem 0.75rem;
  outline: none;
  transition: box-shadow .15s ease, border-color .15s ease, transform .1s ease;
}

input::placeholder, textarea::placeholder { color: #c7a96a; opacity: .65; }

input:focus, textarea:focus { box-shadow: var(--ring); border-color: var(--accent); transform: translateY(-1px); }

.span-3 { grid-column: span 3; }
.span-2 { grid-column: span 2; }

input[disabled], textarea[disabled] {
  opacity: .7;
  cursor: not-allowed;
  border-style: dashed;
}

@media (max-width: 840px) { .grid { grid-template-columns: 1fr 1fr; } .span-3 { grid-column: 1 / -1; } }
@media (max-width: 520px) { .grid { grid-template-columns: 1fr; } }

/* subtle fade-in */
@keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.fade { animation: fadeUp .35s ease both; }
</style>
