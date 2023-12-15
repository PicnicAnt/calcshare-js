import { equationCache } from '@/caches/equation-cache';
import nerdamer from 'nerdamer';
import 'nerdamer/Algebra.js';
import 'nerdamer/Calculus.js';
import 'nerdamer/Solve.js';
import 'nerdamer/nerdamer.core.js';

export class MathService {
    parse(equation, useCache = true) {
        if (useCache) {
            const cachedEquation = equationCache.get(equation);
            if (!cachedEquation) {
                const parsedEquation = this.parse(equation, false);
                equationCache.put(equation, parsedEquation);
                return parsedEquation;
            }

            return cachedEquation
        }
        const result = {
            equation: {
                raw: equation ?? '',
                isParseSuccess: false,
                variables: []
            }
        };

        try {
            const eq = nerdamer(result.equation.raw);
            result.equation.isParseSuccess = true;
            result.parsed = eq;
            result.equation.display = eq.toString();
            result.equation.variables = eq.variables();
            result.solutions = result.equation.variables.map((v) => ({
                variable: v,
                solutions: result.parsed.solveFor(v)
            }));
        } catch (e) {
            result.equation.display = e.message;
        }

        return result;
    }

    calculationVariables(calculation) {
        if (!calculation.equation.isParseSuccess) {
            return [];
        }

        return this.calculationExpressionVariables(calculation, nerdamer(calculation.equation.raw));
    }

    calculationExpressionVariables(calculation, expression) {
        return expression.variables().map(
            (v) =>
            ({
                name: v,
                usedInCalculations: calculation?.id ? [calculation.id] : [],
                input: '',
                value: ''
            })
        );
    }

    mergeVariables(variables) {
        const vars = [];

        variables.forEach((v) => {
            const existingVariable = vars.find((v) => v.name == v.name);

            if (existingVariable) {
                if (
                    !existingVariable.usedInCalculations.some((c1) =>
                        v.usedInCalculations.find((c2) => c1 === c2)
                    )
                ) {
                    existingVariable.usedInCalculations.push(...v.usedInCalculations);
                    existingVariable.input = v.input;
                    existingVariable.value = v.value;
                    existingVariable.hasError = v.hasError;
                    existingVariable.isDeterminate = v.isDeterminate;
                }
            } else {
                vars.push(v);
            }
        });

        return vars;
    }

    uniqueVariables(calculations) {
        const calculationVariables = calculations.flatMap((c) => this.calculationVariables(c));
        const mergedVariables = mathService.mergeVariables([...calculationVariables]);
        return mergedVariables;
    }

    solve(calculation) {
        if (!calculation?.equation?.raw) {
            return [];
        }

        const eq = this.parseCached(calculation.equation.raw);
        if (!eq.equation.isParseSuccess) {
            return [];
        }

        const variables = mathService.calculationVariables(calculation);

        const results = variables
            .map((v) => {
                const variableResult = {
                    ...v,
                    hasError: false
                };

                try {
                    const unsolved = eq.parsed.solveFor(v.name);
                    variableResult.unsolved = unsolved ? unsolved.map((r) => r.text()).toString() : '';
                } catch (e) {
                    variableResult.hasError = true;
                    console.log(e);
                }

                return variableResult;
            })
            .filter((r) => !!r);

        return results;
    }

    mapVariables(variables) {
        const variablesWithInput = variables.filter((v) => !!v.input);
        const vars = Object.assign({}, ...variablesWithInput.map((va) => ({ [va.name]: va.input })));
        return vars;
    }

    solveForVariable(
        parsedEquation,
        variable,
        variablesMap
    ) {
        return parsedEquation.solutions
            .filter((s) => s.variable === variable)
            .flatMap((s) => s.solutions)
            .map((s) => s.evaluate(variablesMap));
    }

    helloWorld() {
        console.log('hello from math service!')
    }
}

export const mathService = new MathService();