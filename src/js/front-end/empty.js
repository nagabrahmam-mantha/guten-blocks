/*const setExtraPropsToBlockType = (props, blockType, attributes) => {
    const notDefined = (typeof props.className === 'undefined' || !props.className) ? true : false

    if (blockType.name === 'core/heading') {
        return Object.assign(props, {
            className: notDefined ? `post__heading-${props.tagName}` : `post__heading-${props.tagName} ${props.className}`,
        });
    }

    if (blockType.name === 'core/list') {
        return Object.assign(props, {
            className: notDefined ? `post__list-${props.tagName}` : `post__list-${props.tagName} ${props.className}`,
            value: attributes.values.replace(/<li>/g, `<li class="test post__list-item is-item-${props.tagName}">`),
        });
    }

    if (blockType.name === 'core/paragraph') {
        return Object.assign(props, {
            className: notDefined ? 'post__paragraph123' : `post__paragraph123 ${props.className}`,
        });
    }

    return props;
};

wp.hooks.addFilter(
    'blocks.getSaveContent.extraProps',
    'your-namespace/block-filters',
    setExtraPropsToBlockType
);*/
