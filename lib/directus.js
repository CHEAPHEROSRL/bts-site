const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export async function fetchItem(collection, itemId) {
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/${collection}/${itemId}`);
    const json = await res.json();
    return json?.data || null;
  } catch (e) {
    return null;
  }
}

export async function fetchItems(collection, ids) {
  try {
    const results = await Promise.all(ids.map(id => fetchItem(collection, id)));
    return results.filter(Boolean);
  } catch (e) {
    return [];
  }
}

export async function fetchPageBlocks(page) {
  const blockIds = Array.isArray(page.blocks) ? page.blocks : [];
  const blocksRes = await fetch(`${DIRECTUS_URL}/items/page_blocks`);
  const blocksJson = await blocksRes.json();
  const pageBlocks = (blocksJson?.data || []).filter(pb => blockIds.includes(pb.id));

  const blocks = [];
  for (const pb of pageBlocks) {
    if (pb.hide_block) continue;
    const blockContent = await fetchItem(pb.collection, pb.item);
    if (blockContent) {
      if (pb.collection === "block_gallery" && blockContent.gallery_items?.length) {
        blockContent.gallery_items_data = await fetchItems("block_gallery_files", blockContent.gallery_items);
      }
      if (pb.collection === "block_logocloud" && blockContent.logos?.length) {
        blockContent.logos_data = await fetchItems("block_logocloud_logos", blockContent.logos);
      }
      if (pb.collection === "block_columns" && blockContent.rows?.length) {
        blockContent.rows_data = await fetchItems("block_columns_rows", blockContent.rows);
      }
      if (pb.collection === "block_testimonials" && blockContent.testimonials?.length) {
        blockContent.testimonials_data = await fetchItems("testimonials", blockContent.testimonials);
      }
      if (pb.collection === "block_steps" && blockContent.steps?.length) {
        blockContent.steps_data = await fetchItems("steps", blockContent.steps);
      }
      if (pb.collection === "block_form" && blockContent.form) {
        const formRes = await fetch(`${DIRECTUS_URL}/items/forms/${blockContent.form}`);
        const formJson = await formRes.json();
        blockContent.form_data = formJson?.data || null;
      }
      blocks.push({ ...blockContent, collection: pb.collection, sort: pb.sort });
    }
  }

  blocks.sort((a, b) => a.sort - b.sort);
  return blocks;
}

export async function fetchNavigation(navigationId) {
  try {
    // Fetch navigation with items
    const res = await fetch(`${DIRECTUS_URL}/items/navigation/${navigationId}?fields=*,items.*`);
    const json = await res.json();
    const nav = json?.data;
    if (!nav) return null;

    const pagesRes = await fetch(`${DIRECTUS_URL}/items/pages?fields=id,permalink,title`);
    const pagesJson = await pagesRes.json();
    const pages = pagesJson?.data || [];
    const pageMap = {};
    pages.forEach(p => { pageMap[p.id] = p; });

    const allItems = nav.items || [];

    const resolveUrl = (item) => {
      if (item.type === "url" && item.url) {
        return item.url;
      }
      if (item.type === "page" && item.page) {
        const page = pageMap[item.page];
        return page?.permalink || "/";
      }
      return "/";
    };

    // Get top-level items (no parent)
    const itemsPromises = allItems
      .filter(item => !item.parent)
      .sort((a, b) => (a.sort || 0) - (b.sort || 0))
      .map(async (item) => {
        let childItems = [];
        
        // If has_children and children array contains IDs, fetch them
        if (item.has_children && item.children && Array.isArray(item.children) && item.children.length > 0) {
          const childIds = item.children.filter(c => typeof c === 'string');
          if (childIds.length > 0) {
            // Fetch each child navigation item by ID
            const childPromises = childIds.map(async (childId) => {
              try {
                const childRes = await fetch(`${DIRECTUS_URL}/items/navigation_items/${childId}`);
                const childJson = await childRes.json();
                return childJson?.data || null;
              } catch (e) {
                return null;
              }
            });
            const childrenData = await Promise.all(childPromises);
            childItems = childrenData
              .filter(Boolean)
              .sort((a, b) => (a.sort || 0) - (b.sort || 0))
              .map(child => ({
                id: child.id,
                title: child.title,
                label: child.label,
                description: child.description,
                icon: child.icon,
                href: resolveUrl(child),
                openInNewTab: child.open_in_new_tab,
              }));
          }
        }

        return {
          id: item.id,
          title: item.title,
          label: item.label,
          href: resolveUrl(item),
          openInNewTab: item.open_in_new_tab,
          hasChildren: item.has_children,
          children: childItems,
        };
      });

    const items = await Promise.all(itemsPromises);

    return {
      id: nav.id,
      title: nav.title,
      items,
    };
  } catch (e) {
    console.error("Error fetching navigation:", e);
    return null;
  }
}

export async function fetchGlobals() {
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/globals`);
    const json = await res.json();
    return json?.data || null;
  } catch (e) {
    console.error("Error fetching globals:", e);
    return null;
  }
}

export async function fetchAllPages() {
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/pages?fields=id,title,permalink,status&filter[status][_eq]=published`);
    const json = await res.json();
    return json?.data || [];
  } catch (e) {
    console.error("Error fetching pages:", e);
    return [];
  }
}

export function getDirectusUrl() {
  return DIRECTUS_URL;
}

export async function fetchFormByKey(key) {
  if (!DIRECTUS_URL) return null;
  
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/forms?filter[key][_eq]=${encodeURIComponent(key)}&filter[status][_eq]=published`);
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

export async function fetchCtaButtons() {
  if (!DIRECTUS_URL) return getDefaultCtaButtons();

  try {
    const res = await fetch(`${DIRECTUS_URL}/items/navigation/cta?fields=*,items.*`);
    if (!res.ok) {
      return getDefaultCtaButtons();
    }
    const json = await res.json();
    const nav = json?.data;
    
    if (!nav?.items?.length) {
      return getDefaultCtaButtons();
    }

    const pagesRes = await fetch(`${DIRECTUS_URL}/items/pages?fields=id,permalink`);
    if (!pagesRes.ok) {
      return getDefaultCtaButtons();
    }
    const pagesJson = await pagesRes.json();
    const pages = pagesJson?.data || [];
    const pageMap = {};
    pages.forEach(p => { pageMap[p.id] = p; });

    return nav.items
      .sort((a, b) => (a.sort || 0) - (b.sort || 0))
      .map(item => ({
        id: item.id,
        text: item.title,
        url: item.type === 'page' && item.page ? (pageMap[item.page]?.permalink || '/') : (item.url || '/'),
        variant: item.label || 'primary',
        openInNewTab: item.open_in_new_tab || false
      }));
  } catch (error) {
    console.error('Error fetching CTA buttons:', error);
    return getDefaultCtaButtons();
  }
}

function getDefaultCtaButtons() {
  return [
    { id: 'primary', text: "Let's Talk", url: '/contact-us', variant: 'primary' },
    { id: 'secondary', text: 'Login', url: '/portal', variant: 'secondary' }
  ];
}
