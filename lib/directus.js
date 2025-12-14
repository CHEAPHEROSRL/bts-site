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

export function getDirectusUrl() {
  return DIRECTUS_URL;
}
