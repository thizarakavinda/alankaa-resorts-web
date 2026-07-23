'use client';
import {useEffect} from "react";
import "./be-style.css";
import { useTheme } from '../../context/ThemeContext';
import { useLocation } from "react-router-dom";

export default function BeSearchForm() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const isPlacesPage = location.pathname === "/places";
  const isExcludingPage = location.pathname === "/booking";
  const { isDark } = useTheme();
  let sfClass = isDark ? "" : "block-search--light";
  // @ts-ignore
  const searchForm = (w: Window) => {
    // @ts-ignore
    !function(e,n){
      // @ts-ignore
      var t="bookingengine",o="integration",i=e[t]=e[t]||{},a=i[o]=i[o]||{},r="__cq",c="__loader",d="getElementsByTagName";
      // @ts-ignore
      if(n=n||[],a[r]=a[r]?a[r].concat(n):n,!a[c]){a[c]=!0;var l=e.document,g=l[d]("head")[0]||l[d]("body")[0];
        // @ts-ignore
        !function n(i){if(0!==i.length){var a=l.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://"+i[0]+"/integration/loader.js",
            a.onerror=a.onload=function(n,i)
                // @ts-ignore
            {return function(){e[t]&&e[t][o]&&e[t][o].loaded||(g.removeChild(n),i())}}(a,(function(){n(i.slice(1,i.length))})),g.appendChild(a)}}(
            ["lk-ibe.hopenapi.com", "ibe.hopenapi.com", "ibe.behopenapi.com"])}
    }(window, [
      ["setContext", "BE-INT-alankaaresort-com_2026-07-23", "en"],
      ["embed", "search-form", {
        container: "be-search-form"
      }]
    ]);
  };

  useEffect(() => {
    if (!isExcludingPage) {
      searchForm(window);
    }
  }, [location.pathname, isExcludingPage]);

  if (isExcludingPage) {
    return null;
  }

  return (
      <div id="block-search" className={`block-search ${sfClass} ${isMainPage ? "block-search--main" : ""} ${isPlacesPage ? "block-search--places" : ""}`}>
        <div id="be-search-form" className="be-container">
          <a href="https://exely.com/" rel="nofollow" target="_blank">Hotel management software</a>
        </div>
      </div>
  )
}