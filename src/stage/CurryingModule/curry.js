// Currying：带入一个函数产出一个新函数
export default function curry(fn, arity = fn.length, context = null) {
    // context上下文
    // variadic(可变参数)
    const curried = (...args) => {
        return args.length >= arity ?
            fn.apply(context, args) : (...rest) => curried.call(context, ...args, ...rest);
    };
    // 返回一个新函数
    return curried;
}
