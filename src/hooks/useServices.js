import { useEffect, useState } from "react";
import { supabase, hasSupabase } from "../lib/supabase";
import { services as baseServices } from "../data/services";

export const parsePriceNumber = (priceStr) => {
  if (!priceStr) return 0;
  const num = String(priceStr).replace(/[^0-9]/g, "");
  return parseInt(num, 10) || 0;
};

export const formatPrice = (num) => `$${Number(num || 0).toLocaleString("es-AR")}`;

const applyOverrides = (overrides) =>
  baseServices.map((service) => {
    const override = overrides[service.id];
    return override ? { ...service, price: formatPrice(override) } : service;
  });

export const useServices = () => {
  const [services, setServices] = useState(baseServices);

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!hasSupabase || !supabase) return;
      const { data } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "precios")
        .maybeSingle();
      if (active && data?.value) {
        setServices(applyOverrides(data.value));
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  return services;
};
