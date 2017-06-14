<template>
<div id="app">
  <header>
    <h2>Texas Hold'em</h2>
  </header>
  <main>
    <section class="left">
      <ul>
      <li>
        <div class="name_column">{{ common.name }}</div>
        <PokeSlot v-for="card in common.cards" :key="card.id" :class="card.suit" :card="card"  />
      </li>
      <hr style="width:100%"/>
      <li v-for="player in players">
        <div class="name_column">{{ player.name }}</div>
        <PokeSlot v-for="card in player.cards" :key="card.id" :class="card.suit" :card="card"  />
      </li>
      </ul>
    </section>
    <section class="right">
      <div><strong>Rank</strong></div>
      <ul>
      <li v-for="candidate, index in candidates">
        <div class="name_column">{{ index + 1 }}.&nbsp;{{ candidate.name }}</div>
        <PokeSlot v-for="card in candidate.cards" :key="card.id" :class="card.suit" :card="card"  />
      </li>
      </ul>
    </section>
    <section class="bottom">
      <Press @click.native="recover" text="Recover" :class="{ inactive: counter <= 0 }"></Press>
      <Press @click.native="openCard" text="Send Card" :class="{ inactive: counter >= 5 }"></Press>
      <Press @click.native="close" text="Compare" :class="{ inactive: counter < 3 }"></Press>
      <Press @click.native="reset" text="Reset"></Press>
    </section>
  </main>
</div>
</template>

<script>
import PokeSlot from './components/Slot';
import Press from './components/Press';
import { Poker, getBestSet, compare, setsConvert } from './js/poker';

const USERS = ['Alice', 'Bob', 'Carol', 'Ted'];

export default {
  data() {
    const sets = Poker();
    const common = { name: 'common', cards: [] };
    const candidates = [];
    const counter = 0;
    const recoverBuffer = [];
    const players = USERS.map((name) => {
      const res = { name, cards: [] };
      for (let i = 0; i < 2; i += 1) {
        const card = sets.next().value;
        res.cards.push(card);
      }
      return res;
    });
    return { sets, players, common, candidates, counter, recoverBuffer };
  },
  methods: {
    recover() {
      if (this.common.cards.length <= 0) return;
      this.recoverBuffer.push(this.common.cards.pop());
      this.counter -= 1;
    },
    reset() {
      this.sets = Poker();
      this.common = { name: 'common', cards: [] };
      this.candidates = [];
      this.counter = 0;
      this.players = USERS.map((name) => {
        const res = { name, cards: [] };
        for (let i = 0; i < 2; i += 1) {
          const card = this.sets.next().value;
          res.cards.push(card);
        }
        return res;
      });
    },
    openCard() {
      if (this.counter >= 5) {
        return;
      }

      if (this.recoverBuffer.length > 0) {
        this.common.cards.push(this.recoverBuffer.pop());
      } else {
        const card = this.sets.next().value;
        this.common.cards.push(card);
      }
      this.counter += 1;
    },
    close() {
      if (this.counter < 3) {
        return;
      }
      this.candidates = [];
      const tmpArr = this.players.map((player) => {
        const numArr = player.cards.concat(this.common.cards).map(card => setsConvert.getNum(card));
        const playerBestnumArr = getBestSet(numArr);

        return { name: player.name, numArr: playerBestnumArr };
      });
      while (tmpArr.length > 0) {
        let best = tmpArr[0].numArr;
        let idx = 0;

        for (let i = 1; i < tmpArr.length; i += 1) {
          if (compare(tmpArr[i].numArr, best) === 1) {
            best = tmpArr[i].numArr;
            idx = i;
          }
        }

        const currentBest = tmpArr.splice(idx, 1).pop();
        const cards = currentBest.numArr.map(num => setsConvert.getCard(num));

        this.candidates.push({ name: currentBest.name, cards });
      }
    },
  },
  components: {
    PokeSlot, Press,
  },
};
</script>

<style lang="scss" scoped>
#app {
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  header {
    margin-top: 20px;
  }
  main {
    display:flex;
    section:nth-child(-n+2) {
      min-width: 40%;
      border:1px solid #CDBCBC;
      padding: 10px;
      .name_column {
        margin-right: 10px;
        height: 75px;
        line-height: 75px;
        min-width: 15%;
      }
    }
    ul {
      margin: 0px;
      padding: 0px;
      display: flex;
      flex-direction:column;
      li {  
        display: inline-flex;
        align-content:space-between;
        list-style: none;
        text-align: left;
        margin: 15px;
        height: 70px;
        .heart, .diamond {
          color: #BC0F0F;
        }
        .club, .spade {
          color: black;
        }
      }
    }
    .left {
      .name_column {
        text-align: right;
      }
    }
    .right {
      // display:flex;
      // flex-direction:column;
      // justify-content:space-around;
      order:2;
    }
    .bottom {
      display:flex;
      flex-direction:column;
      justify-content: space-around;
      margin-top: 30px;
    }
  }
}
</style>
