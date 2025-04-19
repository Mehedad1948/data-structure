'use client'

import React, { useState } from 'react'

export default function Page() {
    const [input, setInput] = useState('')
    const [useMemo, setUseMemo] = useState(false)
    const [count, setCount] = useState<number | null>(null)
    const [elapsedTime, setElapsedTime] = useState<number | null>(null)
    const [result, setResult] = useState(0)
    
    function fib(n: number, counter: { value: number }): number {
        counter.value++
        if (n <= 1) return n
        return fib(n - 1, counter) + fib(n - 2, counter)
    }

    function fibMemo(n: number, counter: { value: number }, memo: Record<number, number>): number {
        counter.value++
        if (n in memo) return memo[n]
        if (n <= 1) return n
        memo[n] = fibMemo(n - 1, counter, memo) + fibMemo(n - 2, counter, memo)
        return memo[n]
    }

    const handleClick = () => {
        const num = parseInt(input)
        if (isNaN(num) || num < 0) return

        const counter = { value: 0 }
        const label = useMemo ? 'fibMemo' : 'fib'
        console.time(label)

        const start = performance.now()

        if (useMemo) {
            setResult(fibMemo(num, counter, {}))
        } else {
            setResult(fib(num, counter))
        }

        const end = performance.now()
        console.timeEnd(label)

        setCount(counter.value)
        setElapsedTime(end - start)
    }

    return (
        <div className='flex flex-wrap justify-around w-full items-center'>
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-4">
                <h1 className="text-2xl font-bold">Fibonacci Recursion Counter</h1>

                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded"
                    placeholder="Enter a number (e.g. 5)"
                />

                <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={useMemo}
                            onChange={(e) => setUseMemo(e.target.checked)}
                        />
                        Use memoization
                    </label>
                </div>

                <button
                    onClick={handleClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Run fib(n)
                </button>

                {count !== null && (
                    <div className="mt-4 text-lg">
                        🔁 Recursive calls: <strong>{count}</strong>
                        <br />
                        ⏱️ Time: <strong>{elapsedTime?.toFixed(2)} ms</strong>
                        <br />
                        Result: <strong>{result}</strong>
                    </div>
                )}
            </div>
            <FibIterative />
            <FibMemo />
        </div>
    )
}

function FibIterative() {
    const [input, setInput] = useState('')

    const [counter, setCounter] = useState(0)
    const [result, setResult] = useState(0)
    const [elapsedTime, setElapsedTime] = useState<number | null>(null)
    function handleClick() {
        let count = 0
        const start = performance.now()
        function fib(n: number,): number {
            let holder = 0
            let a = 0
            let b = 1
            for (let i = 2; i <= n; i++) {
                count++
                holder = a + b
                a = b
                b = holder
            }
            return holder
        }
        setResult(fib(Number(input)))
        const end = performance.now()
        setElapsedTime(end - start)
        setCounter(count)

    }


    return <div className=' '>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-4">
            <h1 className="text-2xl font-bold">Fibonacci Iterative Counter</h1>

            <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded"
                placeholder="Enter a number (e.g. 5)"
            />


            <button
                onClick={handleClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Run fib(n)
            </button>

            {counter !== null && (
                <div className="mt-4 text-lg">
                    🔁 Recursive calls: <strong>{counter}</strong>
                    <br />
                    ⏱️ Time: <strong onClick={() => setElapsedTime(0)}>{elapsedTime?.toFixed(4)} ms</strong>
                    <br />
                    Result fib({input}): <strong>{result} </strong>
                </div>
            )}
        </div>
    </div>
}

function FibMemo() {
    const [input, setInput] = useState('')

    const [counter, setCounter] = useState(0)
    const [result, setResult] = useState(0)
    const [elapsedTime, setElapsedTime] = useState<number | null>(null)
    function handleClick() {
        let count = 0
        const memo: number[] = []
        const start = performance.now()
        function fib(n: number): number {
            count++

            if (memo[n] !== undefined) {
                return memo[n]
            }

            if (n <= 1) {
                return n
            }

            memo[n] = fib(n - 1) + fib(n - 2)
            return memo[n]
        }
        setResult(fib(Number(input)))
        console.log({ memo });

        const end = performance.now()
        setElapsedTime(end - start)
        setCounter(count)

    }


    return <div className=' '>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center p-4">
            <h1 className="text-2xl font-bold">Fibonacci Memo Counter</h1>

            <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded"
                placeholder="Enter a number (e.g. 5)"
            />


            <button
                onClick={handleClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Run fib(n)
            </button>

            {counter !== null && (
                <div className="mt-4 text-lg">
                    🔁 Recursive calls: <strong>{counter}</strong>
                    <br />
                    ⏱️ Time: <strong onClick={() => setElapsedTime(0)}>{elapsedTime?.toFixed(4)} ms</strong>
                    <br />
                    Result fib({input}): <strong>{result} </strong>
                </div>
            )}
        </div>
    </div>
}
