import React, {Component} from 'react';
import {render} from 'react-dom';

export default class Decorator extends Component {
  render() {
    const cc = new Man();
    // cc.toString = 'aa';
    return (<div>
      <h2>钢铁侠制作方案</h2>
      <div>当前状态 ===> {cc.toString()}</div>
    </div>);
  }
}
@canFly(true)
class Man {
  constructor(def = 2, atk = 3, hp = 4) {
    this.init(def, atk, hp);
  }

  @decoratorArmour
  @decoratorAttack
  init(def, atk, hp) {
    this.def = def;
    this.atk = atk;
    this.hp = hp;
  }
  // @readOnly
  toString() {
    return `防御力:${this.def}, 攻击力:${this.atk}, 血量:${this.hp}`;
  }
}

function decoratorArmour(target, key, descriptor) {
  console.log('def before', descriptor.value);
  const original = descriptor.value;
  const moreDef = 100;
  descriptor.value = (...args) => {
    args[0] += moreDef;
    return original.apply(target, args);
  };
  console.log('def after', descriptor.value);
  return descriptor;
}

function decoratorAttack(target, key, descriptor) {
  console.log('atk before', descriptor.value);
  const original = descriptor.value;
  const moreAtk = 100;
  descriptor.value = (...args) => {
    args[1] += moreAtk;
    return original.apply(target, args);
  };
  console.log('atk after', descriptor.value);
  return descriptor;
}

function readOnly(target, key, descriptor) {
  console.log('before readOnly', descriptor);
  descriptor.writable = false;
  console.log('last readOnly', descriptor);
  return descriptor;
}

function canFly(canFly) {
  return function(target) {
    target.canFly = canFly;
    const extra = canFly ? '(技能加成:飞行能力)' : '';
    const original = target.prototype.toString;
    target.prototype.toString = (...args) => {
      return original.apply(target.prototype, args) + extra;
    };
    return target;
  };
}
