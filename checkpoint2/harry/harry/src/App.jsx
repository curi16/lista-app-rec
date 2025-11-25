import React, { useState, useEffect, useMemo } from 'react';
import './App.css'; 

function CombatSystem({ hp, onDamage, onHeal }) {
  const getHpStatus = () => {
    if (hp < 30) return { color: '#e74c3c', status: 'Crítico' };
    if (hp <= 70) return { color: '#f1c40f', status: 'Atenção' };
    return { color: '#2ecc71', status: 'Saudável' };
  };

  const hpStatus = getHpStatus();

  return (
    <div className="component-box">
      <h3>Combate</h3>
      <div className="hp-bar-container">
        <div
          className="hp-bar-fill"
          style={{ width: `${hp}%`, backgroundColor: hpStatus.color }}
        >
          {hp} HP
        </div>
      </div>
      {hp < 30 && <div className="critical-warning">VIDA CRÍTICA!</div>}
      <div className="controls">
        <button onClick={onHeal} title="Usa 1 Poção do Inventário">
          Curar (+10 HP)
        </button>
        <button onClick={onDamage}>Sofrer Dano (-15 HP)</button>
      </div>
    </div>
  );
}

function ExperienceSystem({ xp, level, xpToNextLevel }) {
  const progressPercent = (xp / xpToNextLevel) * 100;

  return (
    <div className="component-box">
      <h3>Experiência (Nível: {level})</h3>
      <div className="level-indicator">Nível Atual: {level}</div>
      <div className="xp-bar-container">
        <div className="xp-bar-fill" style={{ width: `${progressPercent}%` }}>
          {xp} / {xpToNextLevel} XP
        </div>
      </div>
      <div className="next-level-info">
        Próximo nível em: {xpToNextLevel - xp} XP
      </div>
    </div>
  );
}

function Inventory({ items, isOpen, onToggle }) {
  return (
    <div className="component-box">
      <h3>Inventário</h3>
      <button onClick={onToggle}>
        {isOpen ? 'Fechar Mochila' : 'Abrir Mochila'}
      </button>

      {isOpen && (
        <div className="inventory-list">
          <h4>Itens na Mochila:</h4>
          {items.length === 0 ? (
            <p>Mochila vazia.</p>
          ) : (
            <ul>
               
              {items.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function QuestLog({ quests, onAddQuest, onCompleteQuest }) {
  const [newQuestName, setNewQuestName] = useState('');
  const [newQuestCategory, setNewQuestCategory] = useState('Secundária');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestName.trim() === '') {
      alert('O nome da missão não pode estar vazio.');
      return;
    }
    onAddQuest(newQuestName, newQuestCategory);
    setNewQuestName(''); 
  };

  
  const activeQuests = quests.filter((q) => !q.completed);
  const completedQuestsCount = quests.length - activeQuests.length;

  return (
    <div className="component-box">
      <h3>Missões</h3>
      <form onSubmit={handleSubmit} className="quest-form">
        <input
          type="text"
          value={newQuestName}
          onChange={(e) => setNewQuestName(e.target.value)}
          placeholder="Nova missão..."
        />
        <select
          value={newQuestCategory}
          onChange={(e) => setNewQuestCategory(e.target.value)}
        >
          <option value="Principal">Principal</option>
          <option value="Secundária">Secundária</option>
          <option value="Urgente">Urgente</option>
        </select>
        <button type="submit">Adicionar</button>
      </form>

      <h4>Missões Ativas ({activeQuests.length})</h4>
      <ul className="quest-list">
        {activeQuests.map((quest) => (
          <li key={quest.id} className={`quest-${quest.category.toLowerCase()}`}>
            <span>
              <strong>[{quest.category}]</strong> {quest.name}
            </span>
            <button onClick={() => onCompleteQuest(quest.id)}>Concluir</button>
          </li>
        ))}
      </ul>
      <p>Todas as missões completas: {completedQuestsCount}</p>
    </div>
  );
}

function EnchantmentGenerator() {
  const [baseWord, setBaseWord] = useState('');
  const [enchantment, setEnchantment] = useState('');

  const generateEnchantment = () => {
    if (baseWord.length < 3) {
      setEnchantment('Palavra mágica muito fraca!');
      return;
    }
    const reversed = baseWord.split('').reverse().join('');
    setEnchantment(`Ignis ${reversed}us!`);
  };

  return (
    <div className="component-box">
      <h3>Encantamentos</h3>
      <input
        type="text"
        value={baseWord}
        onChange={(e) => setBaseWord(e.target.value)}
        placeholder="Palavra mágica base..."
      />
      <button onClick={generateEnchantment}>Criar Encantamento</button>
      {enchantment && (
        <p className="enchantment-result">
          <strong>Encantar:</strong> {enchantment}
        </p>
      )}
    </div>
  );
}

function PartyRanking({ party, onUpdateMemberLevel }) {
  const sortedParty = useMemo(() => {
    return [...party].sort((a, b) => b.level - a.level);
  }, [party]);

  return (
    <div className="component-box">
      <h3>Menbros do Grupo</h3>
      <ol className="party-list">
        {sortedParty.map((member, index) => (
          <li key={member.id}>
            <span>
              {index + 1}. {member.name} ({member.class}) - Nível:
            </span>
            <input
              type="number"
              value={member.level}
              onChange={(e) =>
                onUpdateMemberLevel(member.id, parseInt(e.target.value) || 0)
              }
              className="level-input"
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

function AttributeSystem({ attributes, points, onDistributePoint }) {
  return (
    <div className="component-box">
      <h3>Atributos</h3>
      <h4>Pontos Disponiveis: {points}</h4>
      <ul className="attribute-list">
        {Object.keys(attributes).map((attrKey) => (
          <li key={attrKey}>
            <span>{attrKey.charAt(0).toUpperCase() + attrKey.slice(1)}:</span>
            <strong>{attributes[attrKey]}</strong>
            <div className="attr-controls">
              <button
                onClick={() => onDistributePoint(attrKey, 1)}
                disabled={points <= 0} 
              >
                +
              </button>
              <button
                onClick={() => onDistributePoint(attrKey, -1)}
                disabled={attributes[attrKey] <= 0} 
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CharacterPanel({ name, onNameChange, info, onInfoChange }) {
  const [showStatus, setShowStatus] = useState(false);

  return (
    <div className="component-box panel-header">
      <h2>{name.toUpperCase() || 'PERSONAGEM SEM NOME'}</h2>
      <div className="character-inputs">
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Nome do Personagem"
        />
        <select
          name="race"
          value={info.race}
          onChange={(e) => onInfoChange(e.target.name, e.target.value)}
        >
          <option value="Humano">Humano</option>
          <option value="Elfo">Elfo</option>
          <option value="Anão">Anão</option>
          <option value="Orc">Orc</option>
        </select>
        <select
          name="class"
          value={info.class}
          onChange={(e) => onInfoChange(e.target.name, e.target.value)}
        >
          <option value="Guerreiro">Guerreiro</option>
          <option value="Mago">Mago</option>
          <option value="Arqueiro">Arqueiro</option>
          <option value="Ladino">Ladino</option>
        </select>
      </div>
      <button onClick={() => setShowStatus(!showStatus)}>
        {showStatus ? 'Esconder' : 'Mostrar'} Efeitos de Status
      </button>
      {showStatus && (
        <ul className="status-effects">
          <li>Queimado (-1 HP/s)</li>
          <li> Bênção de Defesa (+10 Resistência)</li>
        </ul>
      )}
    </div>
  );
}

const SHOP_ITEMS = [
  { id: 'p1', name: 'Poção de Vida', cost: 15 },
  { id: 's1', name: 'Lança de Escama de Dragão', cost: 50 },
  { id: 'm1', name: 'Amuleto de Aumento de Exp', cost: 10 },
];

function EconomySystem({ gold, onTransaction }) {
  const [isShopOpen, setIsShopOpen] = useState(false);

  const handleBuy = (item) => {
    if (gold < item.cost) {
      alert('Galeões insuficientes!');
    } else {
      onTransaction(-item.cost, item);
    }
  };

  return (
    <div className="component-box">
      <h3>Loja</h3>
      <div className="gold-counter">Galeões: {gold} 💰</div>
      <button onClick={() => setIsShopOpen(!isShopOpen)}>
        {isShopOpen ? 'Fechar Loja' : 'Abrir Loja'}
      </button>

      {isShopOpen && (
        <div className="shop-list">
          <h4>Itens à Venda:</h4>
          <ul>
            {SHOP_ITEMS.map((item) => (
              <li key={item.id}>
                <span>
                  {item.name} (Custo: {item.cost} Galeões)
                </span>
                <button onClick={() => handleBuy(item)}>Comprar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function App() {
  const [hp, setHp] = useState(100);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const XP_TO_NEXT_LEVEL = 300;
  const [inventory, setInventory] = useState([
    { id: 'i1', name: 'Espada Longa' },
    { id: 'i2', name: 'Poção de Vida' },
    { id: 'i3', name: 'Mapa' },
  ]);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [quests, setQuests] = useState([]);

  const [party, setParty] = useState([
    { id: 10, name: 'Lancelote', class: 'Guerreiro', level: 5 },
    { id: 11, name: 'Shiro', class: 'Arqueiro', level: 6 },
    { id: 12, name: 'Grom', class: 'Mago', level: 8 },
  ]);

  const [attributePoints, setAttributePoints] = useState(10);
  const [attributes, setAttributes] = useState({
    forca: 5,
    resistencia: 5,
    inteligencia: 5,
    sorte: 5,
  });

  const [characterName, setCharacterName] = useState('Meu Herói');
  const [characterInfo, setCharacterInfo] = useState({
    race: 'Humano',
    class: 'Guerreiro',
  });

  const [gold, setGold] = useState(50);

  useEffect(() => {
    let currentXp = xp;
    let levelsGained = 0;
    
    while (currentXp >= XP_TO_NEXT_LEVEL) {
      levelsGained++;
      currentXp -= XP_TO_NEXT_LEVEL;
    }
    
    if (levelsGained > 0) {
      setLevel(prev => {
        const newLevel = prev + levelsGained;
        alert(`LEVEL UP! Você alcançou o Nível ${newLevel}!`);
        return newLevel;
      });
      setXp(currentXp);
      setAttributePoints(prev => prev + (levelsGained * 5));
      setHp(100);
    }
  }, [xp]);

  const handleHeal = () => {
    const potionIndex = inventory.findIndex(
      (item) => item.name === 'Poção de Vida'
    );
    if (potionIndex > -1) {
      setHp((prevHp) => Math.min(100, prevHp + 10));  
      const newInventory = [...inventory];
      newInventory.splice(potionIndex, 1);
      setInventory(newInventory); 
    } else {
      alert('Sem Poções de Vida no inventário!');
    }
  };

  const handleDamage = () => {
    setHp((prevHp) => Math.max(0, prevHp - 15)); 
  };

  const gainXp = (amount) => {
    setXp((prevXp) => prevXp + amount); 
  };

  const handleAddQuest = (name, category) => {
    const newQuest = {
      id: Date.now(),
      name: name,
      category: category,
      completed: false,
    };
    setQuests((prevQuests) => [...prevQuests, newQuest]); 
  };

  const handleCompleteQuest = (questId) => {
    setQuests((prevQuests) =>
      prevQuests.map((q) =>
        q.id === questId ? { ...q, completed: true } : q
      )
    ); 
    gainXp(100); 
    setGold(prevGold => prevGold + 25); // CORREÇÃO: Atualizar o estado gold diretamente
    alert('Missão Concluída! +100 XP, +25 Galeões');
  };

  const handleUpdatePartyLevel = (memberId, newLevel) => {
    setParty((prevParty) =>
      prevParty.map((m) => (m.id === memberId ? { ...m, level: newLevel } : m))
    );
  };

  const handleDistributePoint = (attrKey, amount) => {
    if (amount > 0 && attributePoints > 0) {
      setAttributePoints((prev) => prev - 1);
      setAttributes((prev) => ({
        ...prev,
        [attrKey]: prev[attrKey] + 1,
      })); 
    } else if (amount < 0 && attributes[attrKey] > 0) {
      setAttributePoints((prev) => prev + 1); 
      setAttributes((prev) => ({
        ...prev,
        [attrKey]: prev[attrKey] - 1,
      })); 
    }
  };

  const handleNameChange = (name) => {
    setCharacterName(name);
  };

  const handleInfoChange = (field, value) => {
    setCharacterInfo((prev) => ({ ...prev, [field]: value })); 
  };

  const handleTransaction = (amount, item) => {
    setGold((prevGold) => {
      const newGold = prevGold + amount;
      if (newGold < 0) {
        alert('Galeões insuficientes!');
        return prevGold;
      }
      return newGold;
    }); 
    
    if (item && amount < 0) {
      setInventory((prevInv) => [...prevInv, { ...item, id: Date.now() }]); 
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dungeons of Harry Potter</h1>
      </header>

      <CharacterPanel
        name={characterName}
        onNameChange={handleNameChange}
        info={characterInfo}
        onInfoChange={handleInfoChange}
      />

      <div className="dashboard-grid">
        <div className="grid-column">
          <CombatSystem
            hp={hp}
            onDamage={handleDamage}
            onHeal={handleHeal}
          />
          <ExperienceSystem
            xp={xp}
            level={level}
            xpToNextLevel={XP_TO_NEXT_LEVEL}
          />
          <AttributeSystem
            attributes={attributes}
            points={attributePoints}
            onDistributePoint={handleDistributePoint}
          />
        </div>

        <div className="grid-column">
          <Inventory
            items={inventory}
            isOpen={isInventoryOpen}
            onToggle={() => setIsInventoryOpen(!isInventoryOpen)}
          />
          <EconomySystem gold={gold} onTransaction={handleTransaction} />
          <QuestLog
            quests={quests}
            onAddQuest={handleAddQuest}
            onCompleteQuest={handleCompleteQuest}
          />
        </div>

        <div className="grid-column">
          <PartyRanking
            party={party}
            onUpdateMemberLevel={handleUpdatePartyLevel}
          />
          <EnchantmentGenerator />
        </div>
      </div>
    </div>
  );
}

export default App;