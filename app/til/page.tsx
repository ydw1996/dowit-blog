import Link from 'next/link';

import { getGitHubPosts } from '@/lib/posts';
import { Post } from '@/types/post';

const formatDate = (dateString: string) => {
    const date = new Date(
        `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6)}`
    );
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
    }).format(date);
};

// 첫 번째 <p> 또는 <li> 태그를 추출하는 함수
const extractFirstContent = (contentHtml: string | undefined) => {
    if (!contentHtml) return '';

    // 첫 번째 <p> 태그 또는 <li> 태그 내용 추출
    const match = contentHtml.match(/<(p|li)>(.*?)<\/\1>/i); // <p> 또는 <li> 태그 탐지
    return match ? match[2] : ''; // 태그 내용 반환
};

const TILPage = async () => {
    const tilPosts: Post[] = await getGitHubPosts();

    return (
        <div className="max-w-4xl mx-auto my-12 sm:px-5 md:px-0">
            {/* 상단 Intro 섹션 */}
            <div className="text-center mb-24">
                <h1 className="text-4xl font-bold text-white mb-4">Today I Learn</h1>
                <p className="text-gray-400 text-lg">
                    매일 조금씩 더 나아가는 과정의 기록, 작은 배움이 모여 큰 성장을 만듭니다.
                </p>
                <div className="mt-6 flex items-center justify-center">
                    <Link
                        href="https://github.com/ydw1996/TIL"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="flex items-center px-6 py-3 text-sm font-medium text-white bg-primary-01 hover:bg-primary-02 rounded-lg transition">
                            {/* 깃허브 로고 추가 */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 mr-2"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 .296c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.111.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.333-5.467-5.931 0-1.31.467-2.381 1.235-3.221-.124-.305-.535-1.524.117-3.176 0 0 1.007-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.242 2.871.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.623-5.478 5.921.43.371.823 1.104.823 2.222 0 1.606-.014 2.901-.014 3.293 0 .319.217.694.824.576C20.565 22.092 24 17.593 24 12.296c0-6.627-5.373-12-12-12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            View on GitHub
                        </button>
                    </Link>
                </div>
            </div>
            <ul className="flex flex-col">
                {tilPosts.map(({ id, title, slug, date, contentHtml }: Post) => {
                    const contentPreview = extractFirstContent(contentHtml); // 컨텐츠 내용 추출

                    return (
                        <Link key={id} href={`/til/${slug}`}>
                            <li className="flex items-start gap-10 group cursor-pointer">
                                {/* Date Section */}
                                <div
                                    className="text-primary-gray text-sm font-light min-w-[140px] text-right"
                                    style={{ flexShrink: 0 }}
                                >
                                    {formatDate(date)}
                                </div>

                                {/* Line and Circle */}
                                <div className="flex flex-col items-center">
                                    <div className="w-[9px] h-[9px] rounded-full border-[2px] border-gray-500 group-hover:bg-primary-01"></div>
                                    <div className="h-40 w-[0.2px] bg-gray-600 opacity-50"></div>
                                    <div className="flex-1 w-[0.25px] bg-gray-500"></div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 rounded-xl p-4 bg-opacity-10 group-hover:bg-primary-01/20 transition-all duration-200 ease-in-out">
                                    <p className="text-xl font-normal mb-2 text-white">{title}</p>
                                    {contentPreview && (
                                        <p className="text-gray-500 text-sm">{contentPreview}</p>
                                    )}
                                </div>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};

export default TILPage;
