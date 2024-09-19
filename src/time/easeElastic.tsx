import ElasticEase from "./ElasticEase";

export function easeElastic(params: ElasticEase): string {
    return `ease${params.direction}Elastic(${params.amplitude}, ${params.period})`;
}
