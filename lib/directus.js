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
      blocks.push({ ...blockContent, collection: pb.collection, sort: pb.sort });
    }
  }

  blocks.sort((a, b) => a.sort - b.sort);
  return blocks;
}

export async function fetchNavigation(navigationId) {
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/navigation/${navigationId}?fields=*,items.*`);
    const json = await res.json();
    const nav = json?.data;
    if (!nav) return null;

    const pagesRes = await fetch(`${DIRECTUS_URL}/items/pages?fields=id,permalink,title`);
    const pagesJson = await pagesRes.json();
    const pages = pagesJson?.data || [];
    const pageMap = {};
    pages.forEach(p => { pageMap[p.id] = p; });

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

    const items = (nav.items || [])
      .filter(item => !item.parent)
      .sort((a, b) => (a.sort || 0) - (b.sort || 0))
      .map(item => {
        const children = (nav.items || [])
          .filter(child => item.children?.includes(child.id))
          .sort((a, b) => (a.sort || 0) - (b.sort || 0))
          .map(child => ({
            id: child.id,
            title: child.title,
            label: child.label,
            href: resolveUrl(child),
            openInNewTab: child.open_in_new_tab,
          }));

        return {
          id: item.id,
          title: item.title,
          label: item.label,
          href: resolveUrl(item),
          openInNewTab: item.open_in_new_tab,
          hasChildren: item.has_children,
          children,
        };
      });

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
