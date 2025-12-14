const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export async function fetchSiteConfig() {
  if (!DIRECTUS_URL) {
    return getDefaultConfig();
  }

  try {
    const ctaNav = await fetch(`${DIRECTUS_URL}/items/navigation/cta?fields=*,items.*`);
    const ctaData = await ctaNav.json();
    
    const ctaButtons = ctaData?.data?.items?.map(item => ({
      id: item.id,
      text: item.title,
      url: item.url || '/',
      variant: item.label || 'primary',
      openInNewTab: item.open_in_new_tab || false,
      sort: item.sort || 0
    })).sort((a, b) => a.sort - b.sort) || getDefaultConfig().ctaButtons;

    return { ctaButtons };
  } catch (error) {
    console.error('Error fetching site config:', error);
    return getDefaultConfig();
  }
}

function getDefaultConfig() {
  return {
    ctaButtons: [
      { id: 'primary', text: "Let's Talk", url: '/contact-us', variant: 'primary', sort: 1 },
      { id: 'secondary', text: 'Login', url: '/portal', variant: 'secondary', sort: 2 }
    ]
  };
}

export async function fetchFormByKey(key) {
  if (!DIRECTUS_URL) return null;
  
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/forms?filter[key][_eq]=${key}&filter[status][_eq]=published`);
    const json = await res.json();
    return json?.data?.[0] || null;
  } catch (error) {
    console.error(`Error fetching form ${key}:`, error);
    return null;
  }
}

export async function fetchFormById(id) {
  if (!DIRECTUS_URL || !id) return null;
  
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/forms/${id}`);
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    console.error(`Error fetching form ${id}:`, error);
    return null;
  }
}
