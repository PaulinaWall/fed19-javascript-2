import React, { useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import useFetch from '../hooks/useFetch';

const HackerNewsArticle = (props) => {
	const [{ data, isLoading, error }, setUrl] = useFetch('');
	const articleId = props.match.params.id;

	useEffect(() => {
		// fetch article from Hacker News API
		if (!articleId) {
			return;
		}

		setUrl(`https://hn.algolia.com/api/v1/items/${articleId}`);
	}, []);

	return (
		<article className="mt-3">
			{
				isLoading ? (
					<h2>Loading...</h2>
				) : (
					error ? (
						<div className="alert alert-warning">
							Bollocks. Something bad happened. Tea?

							<p className="small">{error}</p>
						</div>
					) : (
						data ? (
							<>
								<h1 className="h2">{data.title}</h1>

								<div className="meta">
									<dl className="row">
										<dt className="col-sm-3">Author</dt>
										<dd className="col-sm-9">{data.author}</dd>

										<dt className="col-sm-3">Posted</dt>
										<dd className="col-sm-9">
											<Moment unix format="YYYY-MM-DD hh:mm:ss">{data.created_at_i}</Moment> (<Moment unix fromNow>{data.created_at_i}</Moment>)
										</dd>

										<dt className="col-sm-3">Points</dt>
										<dd className="col-sm-9">{data.points}</dd>
									</dl>
								</div>

								<div className="content" dangerouslySetInnerHTML={{ __html: data.text }}></div>
							</>
						) : ''
					)
				)
			}
		</article>
	)
}

export default HackerNewsArticle;
