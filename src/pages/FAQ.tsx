import React from 'react';
import {questionsAndAnswers} from '../common/questions-answers'

interface Props {}

const FAQ:
  React.FC < Props > = (props) => {
  return (
    <div>
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Frequently asked questions</h2>
            <p className="mt-4 text-lg text-gray-500">
              Can’t find the answer you’re looking for? Reach out to our{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                customer support
              </a>{' '}
              team.
            </p>
          </div>
          <div className="mt-12 lg:col-span-2 lg:mt-0">
            <dl className="space-y-12">
              {questionsAndAnswers.map((faq, idx: number) => (
                <div key={idx}>
                  <dt className="text-lg font-medium leading-6 text-gray-900">{faq.q}</dt>
                  <dd className="mt-2 text-base text-gray-500">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FAQ;
