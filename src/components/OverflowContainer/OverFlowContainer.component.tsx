import { Key, ReactNode, useLayoutEffect, useRef, useState } from "react"
import styles from "./OverFlowContainer.module.css"

type OverflowContainerProps<T> = {
  items: T[]
  renderItem: (item: T) => ReactNode
  renderOverflow: (overflowAmount: number) => ReactNode
  getKey: (item: T) => Key
  className?: string
}

export function OverflowContainer<T>({
  items,
  getKey,
  renderItem,
  renderOverflow,
  className,
}: OverflowContainerProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [overflowAmount, setOverflowAmount] = useState(0)

  useLayoutEffect(() => {
    if (containerRef.current == null) return

    const observer = new ResizeObserver((entries) => {
      console.log(entries)
    })
    observer.observe(containerRef.current)
  }, [])

  return (
    <>
      <div className={styles[`${className}`]} ref={containerRef}>
        {items.map((item) => (
          <div data-item key={getKey(item)}>
            {renderItem(item)}
          </div>
        ))}
      </div>

      <div data-overflow>{renderOverflow(overflowAmount)}</div>
    </>
  )
}
