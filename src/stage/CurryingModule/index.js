import React, {Component} from 'react';
import {render} from 'react-dom';
import curry from './curry';

export default class CurryingModule extends Component {

    render() {
    // Currying

        // 设计一个add方法
        const add = (a, b, c) => {
            return a + b + c;
        };

        // 设计一个要感知上下文的具有函数的对象
        const border = {
            style: 'border',
            generate(length, solid, color) {
                console.log('this', this);
                return `${this.style}: ${length} ${solid} ${color}`;
            },
        };

        // 用curry处理这个函数得到一个新的函数
        const curriedAdd = curry(add);
        const err = curry(add, 2);
        border.curriedGenerate = curry(border.generate, border.generate.length, border);

        const Curring = () => <div>
            {curriedAdd(1, 2, 3)}
            {curriedAdd(1)(2, 3)}
            {curriedAdd(1, 2)(3)}
            {curriedAdd(1)(2)(3)}
            <br />
            {border.curriedGenerate('1px')('solid')('red')}
            <br />
            {err(1, 2, 3)}
            {err(1)(2, 3)}
            {/* {err(1, 2)(3)} 报错 */}
            {/* {err(1)(2)(3)} 报错 */}
        </div>;

        const PartialApplication = () => <div />;

        return (<div>
            <h1>Curring柯里化</h1>
            <div>Currying(柯里化) 是把一个接受 N 个参数的函数转换成接受一个单一参数（最初函数的第一个参数）的函数，
                并且返回接受余下的参数而且返回结果的新函数的技术。也就是说每个函数都接受1个参数。</div>
            {Curring()}
            <h1>PartialApplication偏函数应用</h1>
            <div>Partial Application(偏函数应用) 是指使用一个函数并将其应用一个或多个参数，但不是全部参数，
                在这个过程中创建一个新函数。</div>
            {PartialApplication()}
        </div>);
    }
}
