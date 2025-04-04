"use client";
import {
  useInfiniteQuery
} from "@tanstack/react-query";
import { todoListApi } from "./api";
import { useCallback, useState, useRef } from "react";

export function TodoList() {
  const [enabled, setEnable] = useState(false);

  const {
    data: todoItems,
    error,
    isLoading,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({  
    ...todoListApi.getTodoListInfinityQueryOptions(),
    enabled: enabled,
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  })

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline mb-5">TodoList</h1>
      <button onClick={() => setEnable(e => !e)}>Toggle enabled</button>
      <div
        className={
          "flex flex-col gap-4" + (isPlaceholderData ? " opacity-50" : "")
        }
      >
        {todoItems?.map(item => (
          <div className="border border-slate-300 rounded p-3" key={item.id}>
            {item.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4" ref={cursorRef}>
        {!hasNextPage && <div>Нет данных для загрузки</div>}
        {isFetchingNextPage && <div>...Loading</div>}
      </div>
    </div>
  );
}

export function useIntersection(onIntersect: () => void) {

const unsubscribe = useRef(() => {})

  /* этот хук вызывается когда какой-нибдуь попадает в видимую часть экрана. это нужно для подгрузки */
  return useCallback((el: HTMLDivElement | null) => {
  const observer = new IntersectionObserver(entries => {
      entries.forEach(intersection => {
        if (intersection.isIntersecting) {
          onIntersect();
        }
      });
    });
    if(el) {
      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current();
    }
  }, []);
}
