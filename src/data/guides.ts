interface IGuideList {
    slug: string;
    repoURL: string;
}

const GuideList: IGuideList[] = [
    {
        slug: 'first-year-guide',
        repoURL: 'https://github.com/umanitoba-cssa/first-year-guide',
    },
    {
        slug: 'second-year-guide',
        repoURL: 'https://github.com/pieberrykinnie/second-year-guide'
    },
]

export { GuideList };
export default GuideList;