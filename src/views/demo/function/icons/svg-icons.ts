const req = require.context('../../../../icons/svg', false, /\.svg$/)
const requireAll = (requireContext: any)  => requireContext.keys()

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map((i: any) => {
  return i.match(re)[1]
})

export default svgIcons;


// const req = require.context('./svg', false, /\.svg$/)
// const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
// const requ = requireAll(req)